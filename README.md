# Lead Form Landing

Landing page thu lead duoc xay dung voi Next.js App Router, TypeScript va Tailwind CSS. Form validate o ca client va server, sau do gui du lieu qua API route noi bo de append vao Google Sheet thong qua Google Apps Script Web App.

## Requirements

- Node.js 22+
- pnpm 10+

## Install

```bash
pnpm install
```

## Run Locally

1. Tao file env local:

```bash
cp .env.example .env.local
```

Tren Windows PowerShell co the dung:

```powershell
Copy-Item -LiteralPath ".env.example" -Destination ".env.local"
```

2. Dien `GOOGLE_SCRIPT_URL` vao `.env.local`
3. Chay app:

```bash
pnpm dev
```

Mac dinh Next.js se chay o `http://localhost:3000`. Neu port da duoc su dung, Next.js se tu dong chuyen sang port khac.

## Environment Variables

- `GOOGLE_SCRIPT_URL`: URL cua Google Apps Script Web App da deploy

## Form Payload

Khi submit thanh cong, app se append 1 dong vao Google Sheet theo dung thu tu cot sau:

```text
Họ và tên | Số điện thoại | Email | Ghi chú | Thời gian tạo
```

## Google Sheet Setup

1. Tao mot Google Sheet moi
2. Dat header hang dau tien nhu sau:

```text
Họ và tên | Số điện thoại | Email | Ghi chú | Thời gian tạo
```

3. Trong Google Sheet, mo `Extensions` -> `Apps Script`
4. Xoa code mac dinh va dan doan sau:

```js
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.name || '',
      data.phone || '',
      data.email || '',
      data.note || '',
      data.createdAt || '',
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

`createdAt` da duoc app format san theo mui gio `Asia/Ho_Chi_Minh` voi dang `dd/mm/yyyy hh:mm:ss` truoc khi gui sang Apps Script.

5. Luu script
6. Bam `Deploy` -> `New deployment`
7. Chon loai `Web app`
8. Cau hinh:
   - Execute as: tai khoan cua ban
   - Who has access: chon muc phu hop de website cua ban co the goi duoc Web App
9. Cap quyen khi Google yeu cau
10. Copy URL Web App sau khi deploy
11. Gan URL do vao `.env.local`:

```env
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/your-web-app-id/exec
```

## Deploy

Tren moi truong deploy, chi can:

1. `pnpm install`
2. Cau hinh bien moi truong `GOOGLE_SCRIPT_URL`
3. Build app:

```bash
pnpm build
```

4. Start app:

```bash
pnpm start
```

App co the deploy len bat ky hosting nao ho tro Next.js.

## Notes

- Client khong goi Google Sheet truc tiep
- API route noi bo la `POST /api/leads`
- Validate dien thoai Viet Nam ho tro cac dang `0xxxxxxxxx`, `84xxxxxxxxx`, `+84xxxxxxxxx`
- Server co them rate limit bo nho va timeout khi goi Apps Script de han che spam co ban
