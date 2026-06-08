import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../../config/config";

// ─── Generate OTP ────────────────────────────────────────────────────────────
export const generateOTP = (): number => {
  return crypto.randomInt(1000, 9999);
};

// ─── Hash OTP ─────────────────────────────────────────────────────────────────
export const hashOTP = (data: string): string => {
  if (!config.hashingSecret) {
    throw new Error("Hashing secret is not defined");
  }
  return crypto
    .createHmac("sha256", config.hashingSecret)
    .update(data)
    .digest("hex");
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────
export const verifyOTP = (hashedOTP: string, data: string): boolean => {
  const newHashedOTP = hashOTP(data);
  return newHashedOTP === hashedOTP; // fixed: was comparing newHashedOTP to itself
};

// ─── Nodemailer Transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailUsername,
    pass: config.emailPassword,
  },
});

// ─── Custom HTML Email Template ──────────────────────────────────────────────
const buildOTPEmailHTML = (otp: number): string => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BioScoop OTP</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e5e5;">

            <!-- Header -->
            <tr>
              <td style="background-color:#000000;padding:28px 40px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:1px;">
                  🎬 BioScoop
                </h1>
                <p style="margin:6px 0 0;color:#aaaaaa;font-size:13px;letter-spacing:0.5px;">
                  Your One-Stop Entertainment Solution
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:40px 40px 32px;">
                <p style="margin:0 0 8px;color:#111111;font-size:22px;font-weight:700;">
                  Verify your account
                </p>
                <p style="margin:0 0 28px;color:#555555;font-size:15px;line-height:1.6;">
                  We're excited to have you on board! Use the OTP below to verify your account.
                  This code is valid for <strong style="color:#111111;">2 minutes</strong>.
                </p>

                <!-- OTP Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                  <tr>
                    <td align="center">
                      <div style="display:inline-block;background-color:#000000;border-radius:12px;padding:20px 48px;">
                        <span style="color:#ffffff;font-size:38px;font-weight:800;letter-spacing:10px;font-variant-numeric:tabular-nums;">
                          ${otp}
                        </span>
                      </div>
                    </td>
                  </tr>
                </table>

                <!-- Warning -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9f9;border-radius:10px;border:1px solid #e5e5e5;margin-bottom:28px;">
                  <tr>
                    <td style="padding:14px 18px;">
                      <p style="margin:0;color:#555555;font-size:13px;line-height:1.6;">
                        ⚠️ &nbsp;Never share this OTP with anyone. BioScoop will never ask for your OTP.
                        If you didn't request this, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>

                <p style="margin:0;color:#888888;font-size:13px;line-height:1.6;">
                  This OTP expires in <strong style="color:#111111;">2 minutes</strong>.
                  After expiry, please request a new one.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 40px;">
                <hr style="border:none;border-top:1px solid #e5e5e5;margin:0;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 40px;text-align:center;">
                <p style="margin:0 0 6px;color:#aaaaaa;font-size:12px;">
                  © ${new Date().getFullYear()} BioScoop. All rights reserved.
                </p>
                <p style="margin:0;color:#aaaaaa;font-size:12px;">
                  This is an automated email — please do not reply.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

// ─── Send OTP Email ───────────────────────────────────────────────────────────
export const sendOTPEmail = async (email: string, otp: number): Promise<string> => {
  const message = {
    from: `"BioScoop" <${config.emailUsername}>`,
    to: email,
    subject: "Your OTP for BioScoop",
    html: buildOTPEmailHTML(otp),
  };

  const info = await transporter.sendMail(message);
  return info.messageId;
};