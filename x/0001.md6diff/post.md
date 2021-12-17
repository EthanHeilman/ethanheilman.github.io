![Lorenz cipher](http://upload.wikimedia.org/wikipedia/commons/thumb/3/39/SZ42-6-wheels-lightened.jpg/640px-SZ42-6-wheels-lightened.jpg "Lorenz Cipher")


**A Gap is found:**
In 2009 [a bug was found in the computer generated portion of the proof](http://groups.csail.mit.edu/cis/md6/OFFICIAL_COMMENT_MD6_2009-07-01.txt) of the differential resistance of [MD6](http://en.wikipedia.org/wiki/MD6). As I am a big fan of MD6[^5] and it has a [significant number of users](http://www.upi.com/Top_News/2009/01/25/Virus_strikes_15_million_PCs/UPI-19421232924206) in a [security centric environment.](https://www.google.com/search?q=conficker%20MD6) I felt a strong desire to restore the proof of security.

The bug had already been fixed, but the fixed program wasn't able to quickly prove that MD6 was secure against differential attacks.
When I say quickly I mean that the prover was run for long periods of time without providing a satisfactory result. 
If the prover could be made faster it might be possible to restore the proof of security.
I was given access to the original source code and spent a good chunk of my "project time" in 2010 attempting various strategies to both speed up the prover[^1] and to improve the proof method. 

**The Problem:**
[Differential cryptanalysis](http://en.wikipedia.org/wiki/Differential_cryptanalysis) of a [hash function](http://en.wikipedia.org/wiki/Cryptographic_hash_function) requires finding a differential path through the hash function that has a greater than average chance of generating a collision. 
The proof for the differential resistance of MD6 is approximately[^0]:

1. We use a computer program to upper bound the probability of any differential path surviving to the $n$-th round, $prob(n)$.
2. The probability of a round surviving $m$ rounds where $m = 2 \times n$ is at least[^2] $2 \times prob(n)$ 
3. We want to show that the probability of any differential path surviving to the final round of the hash function is at least $\frac{ 1 }{ 2^{k/2} }$ where $k$ is the key length[^3]. It we can show this, we can show that MD6 is secure against the standard form of differential attack.

Part 1 was checked by a computer. Given a number of rounds, the program would compute the upper bound on the probability of a path surviving that number of rounds. For a larger number of rounds the program took increasing amounts of time. The program was not efficient enough to check the number of rounds we wanted to check and therefore the proof was in doubt.

**Solve The Easy Stuff First:**
In early 2011 I met with success. My method was to break the problem into two cases: An easy case and a hard case. Then use the existing prover to find the upper bound for the differential paths which were very computationally trivial to lower bound (the easy case). To solve the hard case I developed a targeted time/exactness trade-off which efficiently upper bounded the non-trivial differential paths.

Not only did this method [restore the proof of the differential resistance of MD6](http://groups.csail.mit.edu/cis/md6/), but it also nearly doubled the security margin of MD6 against such attacks.  The full paper is available [here](http://eprint.iacr.org/2011/374). The source code to replicate all the results can be found [here](https://github.com/EthanHeilman/MD6_diffp) on [my github account.](https://github.com/EthanHeilman)

**Thanks:** I like to thank [Juniper routers](http://www.juniper.net/) for funding my trip to the [Eurocrypt ECRYPT II hash function workshop](http://www.ecrypt.eu.org/hash2011/program.shtml) to present these results and Ron Rivest and Lisa Yin for providing me with guidance and source control access.

[^0]: The complete details of the original proof can be found in [the MD6 report](http://groups.csail.mit.edu/cis/md6/docs/2009-04-15-md6-report.pdf) Chapter 6.9.
[^1]: I managed to completely parallelize the algorithm. Given $n$ computers the program was speed up by a factor of $n$. I ran it on a cluster of 100 computers for several weeks with moderate success. I choose to abandon this method of attack not just because I needed a larger cluster but also because I wanted a proof that could be replicated by anyone with a desktop computer. [The value of a proof of security is that it can be repeated and checked](http://en.wikipedia.org/wiki/Scientific_method).    
[^2]: The method is very much one of always assuming the worst case analysis to avoid computing all the possibilities. For example the program only deals in the hamming weights of registers in MD6 rather than their actual values.
[^3]: A differential path with a probability so low provides no benefit over [brute force](http://www.qwantz.com/index.php?comic=854) aka [the birthday attack](http://www.codinghorror.com/blog/2007/12/hashtables-pigeonholes-and-birthdays.html). 
[^5]: MD6 is a beautiful design. It is built out of [Non-Linear Feedback Shift Registers](http://en.wikipedia.org/wiki/NLFSR) employing 64-words and [merkle-trees](http://en.wikipedia.org/wiki/Hash_tree) to take advantage of parallelism. It is a hash-function designed for a future filled with 64-bit massively parallel processors (exactly the sort of word Intel and ARM are building). 
