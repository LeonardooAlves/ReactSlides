import sys, json, asyncio, os
from pathlib import Path
from typing import Any, Dict
from playwright.async_api import async_playwright

async def render(config_path: str):
    with open(config_path, "r", encoding="utf-8") as f:
        cfg: Dict[str, Any] = json.load(f)

    base_url = cfg.get("baseUrl", "http://localhost:3000")
    out_dir = Path(cfg.get("outDir", "pdf-exports"))
    out_dir.mkdir(parents=True, exist_ok=True)
    viewport = cfg.get("viewport", {"width": 1280, "height": 800, "deviceScaleFactor": 2})
    wait_until = cfg.get("waitUntil", "networkidle")
    wait_for = int(cfg.get("waitFor", 0))

    cookie_name = os.environ.get("AUTH_COOKIE_NAME")
    cookie_value = os.environ.get("AUTH_COOKIE_VALUE")
    bearer = os.environ.get("AUTH_BEARER_TOKEN")

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": viewport["width"], "height": viewport["height"]})
        page = await context.new_page()

        if bearer:
            await context.set_extra_http_headers({"Authorization": f"Bearer {bearer}"})

        if cookie_name and cookie_value:
            from urllib.parse import urlparse
            domain = urlparse(base_url).hostname or "localhost"
            await context.add_cookies([{
                "name": cookie_name,
                "value": cookie_value,
                "domain": domain,
                "path": "/",
                "httpOnly": False,
                "secure": False,
                "sameSite": "Lax"
            }])

        print_css = None
        if Path("print.css").exists():
            print_css = Path("print.css").read_text(encoding="utf-8")

        for route in cfg.get("routes", []):
            path = route.get("path", "/")
            url = base_url.rstrip("/") + path
            file = route.get("file") or (path.strip("/").replace("/", "_") or "index") + ".pdf"
            page_ranges = route.get("pageRanges")
            margin = route.get("margin", {"top": "12mm", "right": "12mm", "bottom": "16mm", "left": "12mm"})
            format_ = route.get("format", "A4")
            scale = route.get("scale", 1)
            wait_for_selector = route.get("waitForSelector")

            print(f"→ Navigating to {url}")
            resp = await page.goto(url, wait_until=wait_until, timeout=120000)
            if not resp or not resp.ok:
                print(f"  [warn] navigation status: {resp.status if resp else 'NO RESPONSE'}")

            if wait_for_selector:
                await page.wait_for_selector("#content-ready[data-ready='1']", state="attached", timeout=120000)

            if wait_for > 0:
                await page.wait_for_timeout(wait_for)

            if print_css:
                await page.add_style_tag(content=print_css)
            await page.emulate_media(media="print")

            pdf_path = out_dir / file
            await page.pdf(
                path=str(pdf_path),
                format=format_,
                scale=scale,
                margin=margin,
                print_background=True,
                page_ranges=page_ranges
            )
            print(f"  ✓ Saved {pdf_path}")

        await browser.close()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python render_with_playwright.py routes.json")
        sys.exit(1)
    asyncio.run(render(sys.argv[1]))
