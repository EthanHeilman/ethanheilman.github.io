![Duck or rabbit, we draw you decide.](figs/tumblr_inline_na4eglPYtw1qf5p6p.png)

A disclaimer before I get started. The real answer to this question is that it depends on who you ask. Different parties disagree strongly on this issue. ARIN, the [Regional Internet Registry (RIR)](http://en.wikipedia.org/wiki/Regional_Internet_registry), responsible for allocating IP addresses in North America, quite clearly has stated IP addresses are not property and that viewing them as such is harmful to the internet as a whole. 

>6.4.1 Address space not to be considered property
It is contrary to the goals of this document and is not in the interests of the internet community as a whole for address space to be considered freehold property. -  [ARIN Number Resource Policy Manual on Principals of IPv6 allocation](https://www.arin.net/policy/nrpm.html#six41)



Approach
========
My approach will be to look at definitions of property and see to what degree do the rules and expectations of IP address allocations agree with this definition. We will use the infamous [Duck test](http://en.wikipedia.org/wiki/Duck_test)[^1]. To quote Douglas Adams:

>If it looks like a duck, and quacks like a duck, we have at least to consider the possibility that we have a small aquatic bird of the family [Anatidæ](http://en.wikipedia.org/wiki/Anatidae) on our hands. - [Dirk Gently's Holistic Detective Agency](http://en.wikipedia.org/wiki/Dirk_Gently%27s_Holistic_Detective_Agency)

Furthermore I dodge the issue of whether intangibles such as IP addresses or Ideas can truly be owned by focusing this essay on how people treat IP Address allocations rather than what they "truly are". The question I ask 'is do people treat IP address allocations as property, even if they do not name it as such, or do they treat it as something unlike property'. I do not intend to arrive as a concrete answer[^3] but merely present comparisons between property and types of allocations.


A definition of property
=======
[Proudhon](http://en.wikipedia.org/wiki/Proudhon) in his typical frenetic style traces modern property rights to Roman property law:

>Roman law defined property as the right to use and abuse one's own within the limits of the law. [..] The proprietor may, if he chooses, allow his crops to rot under foot; sow his field with salt; milk his cows on the sand; change his vineyard into a desert, and use his vegetable-garden as a park: do these things constitute abuse, or not? In the matter of property, use and abuse are necessarily indistinguishable. - ['What is Property? Or, an Inquiry into the Principle of Right and Government'](http://www.gutenberg.org/files/360/360-h/360-h.htm) 

[James Wilson](http://en.wikipedia.org/wiki/James_Wilson) argues along a similar vein with his definition of the highest degree of property:

>Property is the right or lawful power, which a person has to a thing. Of this right there are three different degrees. The lowest degree of this right is a right merely to possess a thing. The next degree of this right is a right to possess and to use a thing. The next and highest degree of this right is a right to possess, to use, and to dispose of a thing. - [On the History of Property](http://oll.libertyfund.org/titles/2072#lf4140_head_095)

That is, property is something with which the owner is free to do with as they wish, even if others could use the object more productively. Property rights are fundamentally orthogonal to utilitarian complaints[^2]. Using this definition, we can frame a test: 

**If the holder of an IP address allocation has the right to dispose of the IP addresses in anyway, for example to not use it at all, or to freely resell it,  then that allocation is being treated as if it was property.**


Types of allocations
=========
Our question is complicated by fact that there isn't one type of IP address allocation. In fact it appears that there are at least four types of allocations. 

**Legacy allocations:**
Legacy allocations, also known as historical allocations, are IP address allocations given out by IANA. As such the parties receiving the IP addresses did not need to sign contracts governing the use of the IP addresses[^4].
Between 1991 and 1999 IANA began delegating allocation authority to RIRs (Regional Internet Registries). Different regions setup RIRs at different times, so some parties operating in some regions were able to get legacy allocations all the way until 1999[^5].
Since legacy allocations holders didn't sign contracts, they have often acted as though they own the IP addresses as de facto property since they had no contractual obligation to the RIRs or IANA[^6]. 

For instance holders of legacy allocations have attempted to sell/transfer legacy allocations without the consent or knowledge of RIRs. Furthermore, in violation of RIR policy and many of the associated RFCs on allocation, legacy allocation holders have allowed IP addresses to remain unused.

[RFC 2050](http://tools.ietf.org/html/rfc2050) from 1996 lists "Conservation" of addresses as a goal and says: 

>ISPs are required to utilize address space in an efficient manner.  To this end, ISPs should have documented justification available for each assignment.  The regional registry may, at any time, ask for this information.  If the information is not available, future allocations may be impacted. *In extreme cases, existing loans may be impacted*. [RFC 2050](http://tools.ietf.org/html/rfc2050#page-5)

and 

>The transfer of IP addresses from one party to another must be approved by the regional registries.  The party trying to obtain the IP address must meet the same criteria as if they were requesting an IP address directly from the IR. [RFC 2050](http://tools.ietf.org/html/rfc2050#page-10)

Yet, Merck was able to sell Amazon two /12s as of 2012[^7]. Prior to this sale, these prefixes were unrouted on the internet. That is, despite ARIN and RFCs policies on conservation, utilization and transfer of IP addresses, Merck's legacy allocations were left fallow for long periods of time without repercussion. 
This agrees with our definition of property at a right to dispose, "abuse" or unuse, even when such abuse disagrees with the stated larger benefit of society.
Companies are willing to pay more for legacy allocations due to their perceived "additional rights"[^9], and such allocations have been sold off in bankruptcy proceedings, as if they were standard transferable assets[^10].

Even more convincing is a court case that arose about a sale of IP prefixes from Nortel to Microsoft, during Nortel's bankrupcy proceeding. The sale was done without consulting ARIN, in direct violation of ARIN assumed rights. ARIN attempted to intercede in the courts[^11]. The courts settled the matter as follows:

>The court held that Nortel had an exclusive right to use the legacy numbers. The court also explicitly sanctioned Nortel's exclusive right to transfer its exclusive right to use the numbers. In recognizing Nortel's exclusive right to use legacy IPv4 numbers, the court implicitly found that Nortel had the exclusive right to possess the numbers themselves. Consequently, Nortel could exclude others from possession and use of the same legacy IPv4 numbers. In other words, **the court found Nortel possessed the customary "bundle of rights" commonly associated with the ownership of tangible or intangible property**. - [Property Rights in IPv4 Numbers: Recognizing a New Form of Intellectual Property](http://www.americanbar.org/publications/blt/2012/11/03_rubi.html)

In the end both parties compromised:

>Microsoft agreed to sign a special contract for legacy holders, known as a LRSA, and ARIN agreed that the transaction gave Microsoft the
same de facto property rights held by the prior legacy holder, Nortel. - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 11.

The [LRSAs](http://www.arin.net/resources/agreements/legacy_rsa.pdf) explicitly address the issue of property rights of legacy allocations:

>LRSAs purport to extinguish a priori unencumbered legacy IPv4 numbers' property rights. They do so through the incantation a "No Property Rights" clause, ostensibly forcing legacy holders to give up claims to title and other interests in exchange for registration services from RIRs. To be sure, the identical "No Property Rights" clause is found on both the LRSA and RSA. North American legacy holders, faced with ARIN's LRSA, are presented (and expected to accept, without revision) the following provision:
Legacy Holder acknowledges and agrees that: (a) the number resources are not property (real, personal, or intellectual) of Legacy Holder; (b) Legacy Holder does not and will not have or acquire any property rights in or to any number resources for any reason, [..] - [Property Rights in IPv4 Numbers: Recognizing a New Form of Intellectual Property](http://apps.americanbar.org/buslaw/blt/content/2012/11/article-04-rubi.shtml)

**Standard allocations:**
Standard allocations or allocations are what a party would receive if they were to request an allocation from an RIR in the present day. They would be required to sign a contract reserving rights to the RIRs. Under this contract they would be required to use the IP prefixes fully and efficiently and they would not be allowed to transfer these prefixes to another party without the permission of the RIR. That is, they would not have the right to dispose of the IP addresses in any manner. This disagrees strongly with our definition of property.
 
**Assignments:**
Assignments are often seen as not allocations at all, but they are "allocated" to an individual or organisation for a specific use. For instance when a customer requests public IP addresses from Amazon for an EC2 server, those IP addresses are "assigned".

"A distinction is made between address allocation and address assignment, i.e., ISPs are "allocated" address space as described herein, while end-users are "assigned" address space." - [ARIN Number Resource Policy Manual](https://www.arin.net/policy/nrpm.html#two5)
 
These are clearly not property as they given for a period of time for a specific use to as a service. They are owned as much as someone owns a plane by buying a ticket to travel on it.



Conclusion
=========

Are IP allocations Property?

Probably yes if you are talking about legacy allocations, no for other allocations.
Legacy allocations certainly pass the duck test and are generally treated like property. It is less clear with standard allocations, but given the generally assumed right of reclaim by RIRs, standard allocations aren't being treated as "full property". Assignments are clearly not property. 

One form of allocations we didn't address yet are proto-allocations.

**Proto-allocations**
Proto-allocations are a conceptual class of allocations. In most theories of property, original property owners of land receive their property by some process, either by deity, utility or the tacit consent of society. That [IANA](http://en.wikipedia.org/wiki/Internet_Assigned_Numbers_Authority) can allocate IP prefixes to RIRs and other parties begs the question, who allocated IP prefixes and the right of allocation to IANA.
Since the legitimacy of proto-allocations[^12] effects the legitimacy of all allocations below it, which is all allocations, we suggest that someone draft a political philosopher to argue the legitimacy of protocol allocations as to shore up the legitimacy of all allocations.

![the divine right of allocations](figs/tumblr_inline_nd1mj450kk1qf5p6p.jpg)

[^1]: I am aware that the Duck Test makes some [debatable](http://en.wikipedia.org/wiki/Extensionality) [philosophical assumptions](http://en.wikipedia.org/wiki/Identity_of_indiscernibles), but it provides a simple way to address this question. Additionally the choice of bird here seems ironical to me as Duck hunters, to lure unwary ducks, will intentionally create the illusion of a duck by [copying it's external properties](http://en.wikipedia.org/wiki/Mock_duck).

[^2]: In fairness to Proudhon, he was not entirely in favor of this arrangement, but this was how he saw societies legal definition of property. Once could argue that property is necessarily utilitarian since it rests on beneficial mutual agreement as Locke appears to argue in his [The Second Treatise of Civil Government](http://www.constitution.org/jl/2ndtr05.txt), but a debate between social consent and rights does not concern us as I am arguing the mere similarity of  treatment by society.

[^3]: Even if one did arrive at a concrete answer, it might not be true tomorrow with a legal case allowing society at large to reallocate unused IP addresses. It is better create a classification system which can ask, if society at large, in the last 10 years, has  acted as though IP address allocations were property.

[^4]: >Prior to 1991, there were no RIRs with formal policies for allocating number resources, only a central registry known as the Internet Assigned Numbers Authority (IANA), run by USC’s Information Sciences Institute (Cerf, 1990). Furthermore, upon receipt of number resources from IANA, organizations did not have to sign contracts governing their use. - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 2.

[^5]: The time period varies from 1991 to 1999 because: 
>The date varies because RIRs were established in different regions at different times. A North American organization that received address blocks in 1994 is likely to be a legacy holder, because ARIN wasn’t created until 1997, whereas in Europe RIPE-NCC was established in 1991 and had a contractual governance scheme in place by 1994. - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 2.

[^6]: >One of the key policy issues raised by the rise of an IP number trading market is whether these legacy holders have de facto property rights in their blocks, or need approval from RIRs to sell them - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 2.

[^7]: >The other large legacy block transaction involved the pharmaceutical company Merck. In 1992 it was given a /8 (16.78 million numbers). From that original allocation it sold to Amazon two /12s (roughly 2.1 million numbers) early in 2012 - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 8.

[^8]: >The Merck-Amazon deal was not a bankruptcy but a straight legacy transaction, so we do not know the price. But the transaction illustrates the market’s success at moving IPv4 address stock from legacy holders with excessive allocations to expanding, network-intensive industries. According to our tests, both of the /12 blocks went from being unrouted (i.e., not used on the Internet) to publicly routed within a year of the transaction.  - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 9.

[^9]: >By paying 7.5 million, MSFT invested about 11.25 per IPv4 address. Using ARIN’s fee schedule for numbers available in its free pool, Microsoft would have paid only 87,250 per year or about 13 cents per address per year in ARIN fees. To pay ARIN 7.5 million in annual fees, Microsoft would have had to hold the address blocks for 86 years, an unlikely eventuality (unless one believes that we will never get to IPv6 at all!). The disjunction between what MSFT paid Nortel and what it would have paid ARIN for perfect substitutes indicates that there are factors governing firms’ economic calculations regarding IPv4 numbers that may not be obvious to casual observers. The explanation for this puzzle, we believe, can be found in two policy factors. One is the large gap between the restrictiveness of ARIN’s “needs assessment” policies when applied to its remaining free pool allocations and when applied to transfer markets. The other explanation lies in the disjunction between the de facto property rights enjoyed by legacy holders, and the far more limited use rights of non-legacy holders.  - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 9.

[^10]: >In March 2011, it was announced as part of Nortel’s U.S. bankruptcy proceeding that Microsoft would be acquiring 666,624 IPv4 numbers from Nortel for 7.5 million. Microsoft bought 38 number blocks that had been accumulated at various times since 1989 by Nortel from IANA or from corporate acquisitions. Included in the package were sixteen /24s, four /23s, one /22, two /21s, four /20s, nine /16s, and one /17 and /18 each. A second tranche of Nortel IP numbers, sold as part of the Canadian bankruptcy process, went to Vodafone, Salesforce.com, Bell Aliant, and two smaller ISPs. The Canadian court has refused to release any information about the price of these transactions. The Teknowledge /16 sold for 590,000, or 9.00 per address.  - [Dimensioning the Elephant: An Empirical Analysis of the IPv4 Number Market](http://www.internetgovernance.org/wordpress/wp-content/uploads/IPv4marketTPRC20121.pdf) page 8.

[^11]: Re: Nortel Networks, Inc. et al., D. Del., Case No. 09-101138

[^12]: Is this proto-allocation a right founded on social-utility, social contract and consent, sovereign rights of nations or some so-far unnoticed deity of the internet.