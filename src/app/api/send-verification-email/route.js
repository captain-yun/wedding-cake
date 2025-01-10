import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

const getEmailTemplate = (code) => `
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
                <p style="font-size: 14px; margin-bottom: 10px; color: #888;">
                    문제가 발생했거나 요청하지 않으셨다면, 이 이메일을 무시하셔도 됩니다.
                </p>
                <p style="font-size: 14px; color: #888;">감사합니다!<br><strong>웨딩케이크 팀 드림</strong></p>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ 
      cookies: async () => cookieStore 
    });

    const { email, code } = await request.json();

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const { data: recentAttempt } = await supabase
      .from('verification')
      .select('*')
      .eq('email', email)
      .gt('created_at', tenMinutesAgo.toISOString())
      .single();

    if (recentAttempt && recentAttempt.attempts >= 5) {
      return NextResponse.json(
        { error: '인증 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 429 }
      );
    }

    const emailData = {
      from: process.env.MAILGUN_FROM,
      to: email,
      subject: '[웨딩케이크] 회사 이메일 인증',
      html: getEmailTemplate(code)
    };

    if (!process.env.MAILGUN_DOMAIN) {
      throw new Error('MAILGUN_DOMAIN is not configured');
    }

    await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    const expiresAtStr = expiresAt.toISOString().replace('Z', '');
    
    console.log('Expiration time set:', {
      created: new Date().toISOString(),
      expires: expiresAtStr
    });

    if (recentAttempt) {
      await supabase
        .from('verification')
        .update({
          verification_code: code,
          expires_at: expiresAtStr,
          attempts: (recentAttempt.attempts || 0) + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', recentAttempt.id);
    } else {
      await supabase
        .from('verification')
        .insert({
          type: 'COMPANY_EMAIL',
          email: email,
          verification_code: code,
          expires_at: expiresAtStr,
          attempts: 1,
          status: 'PENDING'
        });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    
    return NextResponse.json(
      { 
        error: '이메일 발송에 실패했습니다.',
        details: error.message,
        status: error.status 
      },
      { status: error.status || 500 }
    );
  }
}
