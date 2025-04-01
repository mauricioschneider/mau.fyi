---
title: "HTTPS and the False Sense of Security"
published: 11/25/2019
authors:
  - Mauricio Schneider
---
## Hypertext Transfer Protocol

When you're navigating the Internet, your browser (client) is communicating with other computers that serve content (servers). This is thanks to the fact that both clients and servers speak the same language: Hypertext Transfer Protocol (HTTP).

With HTTP, any data traveling back and forth between the client and the server through the Internet is not secure, and can be intercepted. This is because said data travels in plain text, allowing for man-in-the-middle (MITT) attacks.

## Man-in-the-middle Attacks

To picture what a MITT attack looks like, imagine that you send a letter to a friend. At some point in the delivery process, someone carefully opens up the envelope, copies the letter, puts it back in the envelope, and returns the letter to the delivery pipeline, making it all the way to your friend's address. Neither you or your friend know that someone else read the letter and have a copy of the content in their possession. That person is the man-in-the-middle, and you've been victim of an MITT attack.

Because it's not desirable to have sensitive information traveling the Internet tubes being intercepted by malicious entities, someone thought of a solution: encrypting the communication between client and server. And just like that, HTTPS was born.

## Hypertext Transfer Protocol Secure

Without getting into the technicalities of how encryption works, let's go back to our letter analogy. Let's say you finally found out that someone was intercepting the messages between you and your friend. So you come up with a plan: creating a secret language that only you and your friend can understand. In that way, it doesn't matter if someone else reads the messages. They won't be able to make any sense of it. Only you and your friend know what's in there. Data transfer is now secure.

## Adoption of HTTPS

Although HTTPS was created by Netscape Communications in 1994, it didn't reach wide adoption by browsers until a [few](https://blog.mozilla.org/security/2015/04/30/deprecating-non-secure-http/) [years](https://developers.google.com/web/updates/2016/10/avoid-not-secure-warn) ago. Browsers started to warn users when they were visiting websites that were not using HTTPS. This forced web developers to rapidly adopt the protocol, not always due to the security implications of not doing so, but to also make sure they didn't lose the trust and confidence of their users.

## Caveats of HTTPS

The fact that a website uses HTTPS only means one thing: the data being sent back and forth between your browser and the server is encrypted. This makes it safer than a data transaction through HTTP.

However, it does not mean that the website is 100% secure, for two main reasons: phishing, and bad security practices.

### Phishing

Malicious developers have taken advantage of the fact that web browsers hint users when a website is using HTTPS. They can easily register domains that look very similar to the ones of sensitive websites from institutions like banks, universities, online retail stores, hospitals, utility companies, etc.

Once they create a copy of a known website, they can lure users in by sending phishing emails, sharing links on the web, or by hoping that someone mistypes a URL.

These malicious websites can also use HTTPS in order to get the browser to recognize the connection as secure. However, as you type in or submit your login credentials, your credit card information, or any other type of sensitive information, they're storing it on their side for later use.

To avoid falling victim to a phishing attack, review links before clicking them, and always double check very carefully the URL of the website that you're visiting before typing in any sensitive information. When in doubt, type the URL yourself, instead of clicking any link.

### Bad Security Practices

Even if you're visiting an authentic website and not a malicious copy, and said website is using HTTPS, it doesn't mean that your data is secure. The truth is that once you submit sensitive data, you have no control of what the server is doing with it, and how it's storing it. You can only hope that they're following best practices advised by cyber security experts.

Unfortunately, there's not much you can do in this case to avoid being victim of data theft. The one thing you can do is to review the website's security policies. Best practices are material for a blog post on their own, but a few basic hints that a website doesn't have good security are:

* The website requires passwords of a fixed length

* During a password recovery process, instead of asking you to reset your password, you are sent your actual password in plain text to your email

* The website doesn't allow you to setup multi-factor authentication

* If you type the website's URL using \[domain.com\](http://domain.com), it doesn't automatically redirect you to the HTTPS version


If you have suspicions that the website is not following security best practices, contact them to raise your concerns, or find an alternative website.