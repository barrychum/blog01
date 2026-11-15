---
title: "Gmail search tips"
date: 2015-05-24
categories: 
  - "tips-and-tricks"
---

Some highlights

| Operator | Definition | Examples |
| --- | --- | --- |
| **from:** | Used to specify the sender | Example: **from:amy** Meaning: Messages from Amy |
| **to:** | Used to specify a recipient | Example: **to:david** Meaning: All messages that were sent to David (by you or someone else) |
| **subject:** | Search for words in the subject line | Example: **subject:dinner** Meaning: Messages that have the word "dinner" in the subject |
| **OR** | Search for messages matching term A or term B\* \*OR must be in all caps | Example: **from:amy OR from:david** Meaning: Messages from Amy or from David |
| **\-** (hyphen) | Used to exclude messages from your search | Example: **dinner -movie** Meaning: Messages that contain the word "dinner" but do not contain the word "movie" |
| **label:** | Search for messages by label | Example: **from:amy label:friends** Meaning: Messages from Amy that have the label "friends"Example: **from:david label:my-family** Meaning: Messages from David that have the label "My Family" |
| **has:attachment** | Search for messages with an attachment | Example: **from:david has:attachment** Meaning: Messages from David that have an attachment |
| **list:** | Search for messages on mailing lists | Example: **list:info@example.com** Meaning: Messages with the words info@example.com in the headers, sent to or from this list  |
| **filename:** | Search for an attachment by name or type | Example: **filename:physicshomework.txt** Meaning: Messages with an attachment named "physicshomework.txt"  Example: **label:work filename:pdf** Meaning: Messages labeled "work" that also have a PDF file as an attachment |
| **" "** (quotes) | Used to search for an exact phrase\* \*Capitalization isn't taken into consideration | Example: **"i'm feeling lucky"** Meaning: Messages containing the phrase "i'm feeling lucky" or "I'm feeling lucky" Example: **subject:"dinner and a movie"** Meaning: Messages containing the phrase "dinner and a movie" in the subject |
| **( )** | Used to group words Used to specify terms that shouldn't be excluded | Example: **from:amy (dinner OR movie)** Meaning: Messages from Amy that contain either the word "dinner" or the word "movie" Example: **subject:(dinner movie)** Meaning: Messages in which the subject contains both the word "dinner" and the word "movie" |
| **in:anywhere** | Search for messages anywhere in Gmail\* \*Messages in**Spam** and**Trash** are excluded from searches by default | Example: **in:anywhere movie** Meaning: Messages in **All Mail**, **Spam**, and **Trash** that contain the word "movie" |
| **in:inbox in:trash in:spam** | Search for messages in**Inbox**, **Trash**, or **Spam** | Example: **in:trash from:amy** Meaning: Messages from Amy that are in **Trash** |
| **is:important label:important** | Search within messages that [Priority Inbox](http://mail.google.com/support/bin/answer.py?answer=186531)considers important. | Example: **is:important from:janet** Meaning: Messages from Janet that were marked as important by **Priority Inbox** |
| **is:starred is:unread is:read** | Search for messages that are starred, unread, or read | Example: **is:read is:starred from:David** Meaning: Messages from David that have been read and are marked with a star |
| **has:yellow-star has:red-star has:orange-star has:green-star has:blue-star has:purple-star has:red-bang has:orange-guillemet has:yellow-bang has:green-check has:blue-info has:purple-question** | Search for messages with a particular star | Example: **has:purple-star from:David** Meaning: Messages from David that are marked with a purple star |
| **cc: bcc:** | Used to specify recipients in the **cc:** or **bcc:**fields\* \*Search on bcc: cannot retrieve messages on which you were blind carbon copied | Example: **cc:david** Meaning: Messages that were cc-ed to David |
| **after: before: older: newer:** | Search for messages sent or received during a certain period of time (using the date format yyyy/mm/dd) | Example: **after:2004/04/16 before:2004/04/18** Meaning: Messages sent between April 16, 2004 and April 18, 2004.\* \*More precisely: Messages sent after 12:00 AM (or 00:00) April 16, 2004 and before April 18, 2004. |
| **older\_than newer\_than** | Similar to**older** and**newer**, but allows relative dates using **d**,**m**, and **y** for**day**, **month**, and **year** | Example: **newer\_than:2d** Meaning: Finds messages sent within the last two days. |
| **is:chat** | Search for chat messages | Example: **is:chat monkey** Meaning: Any chat message including the word "monkey." |
| **deliveredto:** | Search for messages within a particular email address in the Delivered-To line of the message header | Example:**deliveredto:username@gmail.com** Meaning: Any message with username@gmail.com in the Delivered-To: field of the message header (which can help you find messages forwarded from another account or ones sent to an alias). |
| **circle:** | Search for messages that were sent from someone who you added to a particular Google+ circle | Example: **circle:friends** Meaning: Any message that was sent by a person in your "Friends" circle. Examples: **circle:"soccer friends (team blue)"** or **circle:"my \\"fab four\\""** Notes: For circle names that include a space, parentheses, curly brackets, or vertical bar, add quotes around the name. For names that include quotes, add a back slash immediately before the quotes. |
| **has:circle** | Search for all messages that were sent from someone who you added to your Google+ circles | Example: **has:circle** Meaning: Any message that was sent by a person in any of your circles. |
| **category:** | Search for messages within a category | Example: **category:updates** Meaning: All messages in the Updates category. Example: **category:social Mindy** Meaning: Messages in the Social category that include ?indy.??/td> |
| **size:** | Search for messages larger than the specified size in bytes | Example: **size:1000000** Meaning: All messages larger than 1MB (1,000,000 bytes) in size. |
| **larger: smaller:** | Similar to**size:** but allows abbreviations for numbers | Example: **larger:10M** Meaning: All messages of at least 10M bytes (10,000,000 bytes) in size. |
| **+** (plus sign) | Match the search term exactly | Example: **+unicorn** Meaning: Finds messages containing ?nicorn??but not ?nicorns??or ?nciorn??/td> |
| **rfc822msgid:** | Find a message by the message-id header | Example:**rfc822msgid:200503292@example.com** Meaning: Locates the exact message with the specified SMTP message-id.[Learn more about headers](http://support.google.com/mail/bin/answer.py?answer=22454). |
| **has:userlabels has:nouserlabels** | Search for messages that have and have not had labels that you created applied to them. NOTE: Gmail applies labels to individual messages, not to conversation threads. | Example: **has:nouserlabels** Meaning: Finds all messages without any of your own labels (excludes automatic labels like inbox, spam, and trash). Since Gmail applies labels to individual messages, you might see results that appear to have labels; in this case, another message in the same conversation thread has had a label applied to it. |

 

### Boolean operators

You can use boolean operators such as 'OR' when searching in Gmail. For example, to look for messages from username@gmail.com and messages that contain the subject line 'Meeting reminder', you can enter 'username@gmail.com OR meeting reminder' in your Gmail search box.
