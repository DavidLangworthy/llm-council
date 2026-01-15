"""Smoke test for OpenRouter reasoning.effort support."""

import asyncio

from backend.config import COUNCIL_MODELS, REASONING_EFFORT
from backend.openrouter import query_model


async def main():
    failures = []
    for model in COUNCIL_MODELS:
        response = await query_model(
            model,
            [
                {
                    "role": "user",
                    "content": "Say 'ok' and nothing else.",
                }
            ],
        )
        if response is None or not response.get("content"):
            failures.append(model)
            print(f"fail: model={model} reasoning_effort={REASONING_EFFORT}")
        else:
            print(f"ok: model={model} reasoning_effort={REASONING_EFFORT}")

    if failures:
        raise RuntimeError(
            "OpenRouter call failed for: "
            f"{', '.join(failures)} with reasoning effort {REASONING_EFFORT!r}."
        )


if __name__ == "__main__":
    asyncio.run(main())
