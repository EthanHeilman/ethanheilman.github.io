![http://www.flickr.com/photos/therealbrute/4375582453/sizes/z/](figs/tumblr_inline_mywa74aLV11qf5p6p.jpg)

I read Eyal and Sirer ['Majority is not Enough: Bitcoin Mining is Vulnerable'](http://arxiv.org/abs/1311.0243) analyzing Selfish Mining on the day it was published.
Since then I've been working on solutions to selfish mining.
Today I'm posting a draft of my work in which I propose a novel solution using unforgeable timestamps and random beacons. I improve on the current best result increasing the minimum size of mining pool which can selfishly mine from 25% to 32%.

You can read the paper here: [One Weird Trick to Stop Selfish Miners: Fresh Bitcoins, A Solution for the Honest Miner.](http://eprint.iacr.org/2014/007.pdf) 

What is Selfish Mining?
=================

For an gentle introduction read to Selfish Mining read ['Bitcoin is Broken'](http://hackingdistributed.com/2013/11/04/bitcoin-is-broken/) or ['The best way to take control of Bitcoin? Rally other greedy “selfish miners”'](http://arstechnica.com/information-technology/2013/11/the-best-way-to-take-control-of-bitcoin-rally-other-greedy-selfish-miners/) . 

tl;dr A Bitcoin mining pool which is big enough can behave selfishly and win more than their fair share of mining rewards. This is bad and could result in a [Tragedy of the Commons ](http://en.wikipedia.org/wiki/Tragedy_of_the_commons) as selfishness would become incentivized. 


Abstract:
======

A recent result in Bitcoin is the selfish mining strategy in which a selfish cartel withholds blocks they mine to gain an advantage.
This strategy is both incentive-compatible and harmful to Bitcoin.
In this paper we introduce a new defense against selfish mining that improves on the previous best result, we raise the threshold of mining power necessary to profitably selfishly mine from 25% to 32% under all propagation advantages.
While the security of our system uses unforgeable timestamps, it is robust to their compromise.
Additionally, we discuss the difficulty a mining conspiracy would face attempting to keep the compromise of our scheme secret and
we analyze incentives for getting miners to adopt these changes.

Suggestions welcome on twitter: [@Ethan_Heilman](https://twitter.com/Ethan_Heilman) or email Ethan.R.Heilman@gmail.com