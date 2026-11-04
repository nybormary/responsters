// Card pages /<lang>/http/<code>/ (RSP-90, RSP-138).
// testomat.io: case to add (folder "Card pages").
import { test, expect, TAG, TID } from '../fixtures';

// RSP-138 AC6: the art on a card page has alt text from the card data in the page language (texts.cards[code].art).
// Checked on a few cards; the language is random per test, as everywhere.
for (const code of [102, 404, 504] as const) {
  test(
    `Card page art has alt text in the page language: ${code}`,
    { tag: [TAG.cardPages] },
    async ({ page, lang, texts }) => {
      await page.goto(`/${lang}/http/${code}/`);
      const art = page.getByTestId(TID.cardPage).getByRole('img');
      await expect(art).toHaveCount(1);
      await expect(art).toHaveAttribute('alt', texts.cards[code].art);
    },
  );
}
