export const getEmailTemplate = (code) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>웨딩케이크 인증 코드</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <tr>
            <td style="text-align: center; padding: 20px;">
                <h1 style="color: #4CAF50; margin-bottom: 10px;">💍 웨딩케이크</h1>
                <p style="font-size: 18px; margin: 0;">인증 코드로 연결하세요!</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <p style="font-size: 16px; margin-bottom: 10px;">아래 인증 코드를 입력해 주세요:</p>
                <div style="font-size: 24px; font-weight: bold; color: #4CAF50; background-color: #f4f4f4; padding: 15px; border-radius: 8px; display: inline-block;">
                    ${code}
                </div>
                <p style="font-size: 14px; color: #555; margin-top: 10px;">코드는 <strong>10분 동안만 유효</strong>합니다.</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center;">
                <p style="font-size: 14px; color: #888;">감사합니다!<br><strong>웨딩케이크 팀 드림</strong></p>
            </td>
        </tr>
    </table>
</body>
</html>
`; 