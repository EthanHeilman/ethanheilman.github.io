**Update 3:**
Our response has been published in the Notices of the AMS as [a letter to the editor](http://www.ams.org/notices/201506/rnoti-p613.pdf).


**Update 2:**
Peter Woit has [written a blog post reacting to Dr. Wertheimer's letter in the AMS](http://www.math.columbia.edu/~woit/wordpress/?p=7457).

**Update:** Matthew Green has just written [a response to Dr. Wertheimer letter](http://blog.cryptographyengineering.com/2015/01/hopefully-last-post-ill-ever-write-on.html).

In a recent letter to the American Mathematical Society titled ['Encryption and the NSA Role in International Standards'](http://www.ams.org/notices/201502/rnoti-p165.pdf), [Dr. Wertheimer](http://en.wikipedia.org/wiki/Michael_Wertheimer), a former NSA Mathematician and Research Directer, works very hard to leave the impression that the NSA did not place a backdoor in the [DUAL_EC_DRBG algorithm](http://blog.cryptographyengineering.com/2013/09/the-many-flaws-of-dualecdrbg.html). He never directly says that though because the evidence is so overwhelming to the contrary. Instead he chooses to engage in what can only be called aggressive and willfully misleading:

1. He produces a history of the development of DUAL_EC_DRBG that neglects any facts about the NSA designing it for the purposes of subverting encryption. He does not mention what internal NSA documents called “a challenge in finesse” to get NIST to accept it[^0].  
To further his deception he never once mentions the overwhelming public evidence provided by Snowden that DUAL EC was intentionally backdoored by the NSA[^1]. He mentions nothing about the 10 million dollars the NSA paid to have RSA make the backdoored algorithm, DUAL_EC_DRBG, the default in RSA's library[^10].
Are such ["sins of omission"](http://en.wikipedia.org/wiki/Lie#Lying_by_omission) acceptable behavior by a mathematician in a mathematical publication[^11]? 

2. He suggests strongly, but never says, that the NSA does not backdoor encryption, [which we know to be false](http://ethanheilman.tumblr.com/post/70646748808/a-brief-history-of-nsa-backdoors).

The most problematic is the statement that:

>"[..] we realize that our advocacy for the DUAL_EC_DRBG casts suspicion on the broader body of work NSA has done to promote secure standards. Indeed, some colleagues have extrapolated this single action to allege that NSA has a broader agenda to “undermine Internet encryption.” A fair reading of our track record speaks otherwise." - ['Encryption and the NSA Role in International Standards'](http://www.ams.org/notices/201502/rnoti-p165.pdf) 

A "fair reading" is a very strange test, but the NSA's advocacy for controlling cryptographic research, subverting internet encryption and sabotaging standards speaks quite clearly towards its broad agenda.

The NSA's own history talks about shortening the DES key length so they could break it[^2]. That is, the NSA willfully created insecure standards. This takes place with the backdrop of the NSA's earlier blacklisting of [Feistel](http://en.wikipedia.org/wiki/Horst_Feistel) (the inventor of DES) so he couldn't find employment researching block ciphers[^3]. 

ProPublica quotes an NSA document 'One goal in the agency’s 2013 budget request was to “influence policies, standards and specifications for commercial public key technologies,"'[^6] for the purposes of exploitation. In that same document the NSA discusses their successes in backdooring web and VPN encryption hardware to gain further exploitation capabilities[^5].

The NSA's own leaked documents clearly shows a broad agenda of undermining internet encryption.  Dr. Wertheimer, as both a former Technical Director of NSA’s Signals Intelligence Directorate and former Director of Research at NSA[^7], must know this.

He concludes his letter with:

"During those formative years I had many opportunities to present results at AMS conferences, and I remember the warm embrace of colleagues who encouraged and supported my studies. I felt then, and I feel now, a connection to the mathematics community that goes beyond scholarship."

He is trying to make fools of that same community which showed him such warmth and friendship. This lack of respect and forthrightness to a community which nurtured him saddens me[^8]. It shows how the NSA's relationship with the Mathematical community is morally corrosive. 
It turns colleagues, friends and communities into [marks](http://en.wikipedia.org/wiki/Confidence_trick#Terminology)[^9].

[^0]: 'The N.S.A. wrote the standard and aggressively pushed it on the international group, privately calling the effort “a challenge in finesse.”
“Eventually, N.S.A. became the sole editor,” the memo says.' - [N.S.A. Able to Foil Basic Safeguards of Privacy on Web](http://www.nytimes.com/2013/09/06/us/nsa-foils-much-internet-encryption.html?pagewanted=all)


[^1]: "Classified N.S.A. memos appear to confirm that the fatal weakness, discovered by two Microsoft cryptographers in 2007, was engineered by the agency." - [Revealed: The NSA’s Secret Campaign to Crack, Undermine Internet Security](http://www.propublica.org/article/the-nsas-secret-campaign-to-crack-undermine-internet-encryption)

[^2]: "NSA worked closely with IBM to strengthen the algorithm against all except brute force attacks and to strengthen substitution tables, called S-Boxes. Conversely, NSA tried to convince IBM to reduce the length of the key from 64-bit to 48-bits. Ultimately, they compromised on a 56-bit key." [Book III: Retrenchment and Reform](http://cryptome.org/0001/nsa-meyer.htm) by Tom Johnson

[^3]: Some details of this are in [An Introduction to Cryptography, Second Edition By Richard A. Mollin ](https://books.google.com/books?id=Vje8TRcLlycC&lpg=PA138&ots=rF2KcUz71z&dq=Feistel%20biography&pg=PA138#v=onepage&q=Feistel%20biography&f=false)

[^4]: "The Clipper Chip was a chipset developed and promoted by the US Government. It was intended for the implementation in secure voice equipment, such as crypto phones, and required users to give their cryptographic keys in escrow to the government. This would allow law enforcement agencies to decrypt any traffic for surveillance and intelligence purposes." - [Crypto Museum Clipper Chip](http://www.cryptomuseum.com/crypto/usa/clipper.htm)

[^5]: "(TS//SI//REL TO USA, FVEY) Complete enable for [REDACTED] encryption chips used in Virtual Private Network and Web encryption devices [CCP_00009]" - [(U) COMPUTER NETWORK OPERATIONS (U) SIGINT ENABLING ](http://www.nytimes.com/interactive/2013/09/05/us/documents-reveal-nsa-campaign-against-encryption.html?_r=1&)

[^6]: 'One goal in the agency’s 2013 budget request was to “influence policies, standards and specifications for commercial public key technologies,” the most common encryption method.' - [Revealed: The NSA’s Secret Campaign to Crack, Undermine Internet Security](http://www.propublica.org/article/the-nsas-secret-campaign-to-crack-undermine-internet-encryption)

[^7]: [Wertheimer Bio](http://www.casl.umd.edu/sites/default/files/wertheimer_bio.pdf) 

[^8]: One might excuse his behavior if he was being compelled to testify and the maintenance of the secrecy of this backdoor was of great national importance, but he choose to write his letter to the AMS and the backdoor is already well known. This is merely deceit for the sake of PR.

[^9]: Consider how the NSA also manipulated NIST to get the backdoored standard approved. Damaging the credibility of an organisation which thought itself a partner of the NSA.

[^10]: "Undisclosed until now was that RSA received $10 million in a deal that set the NSA formula as the preferred, or default, method for number generation in the BSafe software, according to two sources familiar with the contract. Although that sum might seem paltry, it represented more than a third of the revenue that the relevant division at RSA had taken in during the entire previous year, securities filings show." - [Exclusive: Secret contract tied NSA and security industry pioneer](http://www.reuters.com/article/2013/12/20/us-usa-security-rsa-idUSBRE9BJ1C220131220) 

[^11]: Would it be acceptable for someone to publish a paper that suggested that there was no primes larger than 5, and wittingly neglected to mention 7?