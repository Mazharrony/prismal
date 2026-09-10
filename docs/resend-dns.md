# Resend DNS for prismal.ae

The Brief form sends through Resend from `hello@prismal.ae`. Resend only
sends from a verified domain, so until these records exist the form shows
"Couldn't send just now — email us directly at hello@prismal.ae".

Domain registered in Resend on 2026-09-10 (region `eu-west-1`,
id `80092f83-52ec-4670-b0cd-4b5455c2c148`). Add these three records at the
DNS host for `prismal.ae`, then press **Verify** at
<https://resend.com/domains>. Propagation usually takes minutes, at most a
few hours.

| Type | Host / name              | Value                                          | Priority | TTL  |
| ---- | ------------------------ | ---------------------------------------------- | -------- | ---- |
| TXT  | `resend._domainkey`      | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDk1HcloWRyictKfhBJMRVQUPAGFtiBBE5Hq2monraNOsYwYBsawWHxf1fjHWJxYrjPjBHw8jKP0Yh5qItCcbxb5zOhYzMh5qTAg7jGRRMvtCM1ohQ56kHe/6Wh9dp6JXqXl111SIadZWQJTjx5EAr0Ljytyf9uFSxQxackjs7RdQIDAQAB` | —        | Auto |
| MX   | `send`                   | `feedback-smtp.eu-west-1.amazonses.com`        | 10       | 60   |
| TXT  | `send`                   | `v=spf1 include:amazonses.com ~all`            | —        | 60   |

Notes

- Hosts are relative to the zone: `send` means `send.prismal.ae`,
  `resend._domainkey` means `resend._domainkey.prismal.ae`. Some panels want
  the full name; some strip the domain automatically.
- These records only affect the `send` subdomain and the DKIM selector, so
  they do not interfere with any existing mail on `prismal.ae`.
- The API key lives in `.env.local` (gitignored) as `RESEND_API_KEY`, with
  `BRIEF_TO_EMAIL` and `BRIEF_FROM_EMAIL`. Set the same three variables on
  the host at deploy time.
