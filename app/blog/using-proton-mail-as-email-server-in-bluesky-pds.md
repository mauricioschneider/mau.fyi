---
title: "Using Proton Mail as Email Server in Bluesky PDS"
published: 02/25/2024
authors:
  - Mauricio Schneider
---
![](/blog-assets/using-proton-mail-as-email-server-in-bluesky-pds/header.webp)

This week, [Blues](https://bsky.app/)[ky](https://bsky.app/) launched its [early access federation for self-hoste](https://docs.bsky.app/blog/self-host-federation)[rs](https://docs.bsky.app/blog/self-host-federation). It lets you set up a Personal Data Server to host your data. Setting up a PDS is super easy. You need to follow the steps documented in their [bluesky-social/p](https://github.com/bluesky-social/pds)[ds repo.](https://github.com/bluesky-social/pds)

The email server is the only thing that doesn't work out of the box. Since I already use Protonmail, I decided to use their [STMP submis](https://proton.me/support/smtp-submission)[sion feature,](https://proton.me/support/smtp-submission) which is available to Proton for business subscribers.

The steps to set up Proton Mail are pretty straightforward:

1. Create an SMTP submission token in your [Proton accou](https://account.proton.me/u/0/mail/imap-smtp)[nt's settings](https://proton.me/support/smtp-submission)

2. SSH into your Bluesky PDS instance

3. Go to [`/pds` and open the](https://github.com/bluesky-social/pds) `pds.env` file with your editor of choice

4. Add the following environment variables:

    * `PDS_EMAIL_SMTP_URL=smtps://[USERNAME]:[`[`SMTP_TOKEN]@smt`](https://proton.me/support/smtp-submission)`p.protonmail.ch:465`

    * `PDS_EMAIL_FROM_ADDRESS=no-reply@[HOST]`

      Where `[USERNAME]` is your SMTP username (the email address), `[SMTP_TOKEN]` is the token you generated in step 1, and `[HOST]` is either the usual email domain you use in Proton Mail, or the domain where you're running your PDS (which you should add as domain to Proton Mail anyways).

5. Restart the PDS service by running `systemctl restart pds`


Once you've completed these five steps, your PDS instance should be ready to send emails. A quick way to test it is by creating a new account and ensuring you receive the email verification email in your inbox.