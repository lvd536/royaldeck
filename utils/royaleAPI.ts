import { ClashRoyaleAPI } from "@varandas/clash-royale-api";

export const royaleAPI = new ClashRoyaleAPI(
    process.env.ROYALE_API_TOKEN!,
    "https://proxy.royaleapi.dev/v1",
);

export const cards = await royaleAPI.getCards();
