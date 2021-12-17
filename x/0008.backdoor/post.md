![](http://media.tumblr.com/tumblr_m8ezekZVUN1qf5p6p.jpg)

Lets say that you have [an unbreakable cipher](http://en.wikipedia.org/wiki/Magic_(paranormal)) (or [it's closest approximation](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard)) and that you, Eve, have the ability [to break all other known ciphers.](http://en.wikipedia.org/wiki/Scrying)
There is a [risk](http://en.wiktionary.org/wiki/double-edged_sword) that if you use or deploy your unbreakable cipher it may be captured by your enemy Alice and thus prevent you [from eavesdropping on Alice's communication](http://en.wikipedia.org/wiki/SIGINT).
What should you do?

**Use an Insecure Cipher:** 
One option is that Eve could use a cipher that she can break. 
Thus if the cipher is captured and used by Alice, Eve can still eavesdrop.
A problem is that Alice may also discover this weakness and use it to listen to Eve's communications[^2]. 
One possible solution is to be design a secure cipher with a [small enough key space that Eve could brute force the keys](http://en.wikipedia.org/wiki/Data_Encryption_Standard#NSA.27s_involvement_in_the_design), but Alice with less resources would be unable to.
This is a less than ideal solution because Alice may, in time, be able to build [more powerful computers](http://en.wikipedia.org/wiki/EFF_DES_cracker) to allow her to break the cipher.


**Weak Keys:** 
It is not unimaginable that a [cipher could exist which is secure only under some of its keys](http://www.iis.sinica.edu.tw/papers/mn/8101-F.pdf)[^1].
For example consider a cipher that is secure when the first bit of the key is $0$ but totally insecure when the first bit of the key is $1$.
Lets construct a trivial example of such a cipher:

    Encrypt(key, plaintext)
        if key[0] == 1
          return plaintext
        else 
          return SecureEncrypt(key, plaintext)

While the trivial example seems rather silly, I see no reason why a secure cipher and an insecure cipher might not be mixed together such that the cipher is only insecure under certain keys without being as obvious as our example.
Under such a system Eve could choose to only use the strong keys and Alice would on the average use a weak key half the time.

**Distinguishing Weak Keys:** 
For Eve to use this system securely there must be a way of telling apart strong keys and weak keys.
Assume Eve has a key generator that will only output strong keys.
If Alice captures this key generator then Alice will be secure as she can now generate secret keys.
Therefore spooknet can never put the key generator into the field.
Instead Eve can pre-generate lists strong keys for use.
If Alice captures some of these strong keys and uses them, Eve can still decrypt the messages since Eve has a copy of all the strong keys she has generated so far she can just try all the keys she has issued.

![Laugh-Out-Loud Cats #736](http://media.tumblr.com/tumblr_m7acgaY7XR1qf5p6p.jpg)

**Assumptions:**
This whole fantasy is based on the existence of certain functions for which there is no evidence that they exist.
We need a function, $F$, that generates our backdoored cipher $C_k$, the strong key generator $G_k$, and the weak key attack function $A_k$, all under some key, $k$.

$$C_k, G_k, A_k \leftarrow F(K_k)$$

$C_k$ is the backdoored cipher we have been discussing all along. 
Under half its keys it is secure, under the other half of its keys it is unsecure. 
Given $C_K$ it is impossible distinguish the secure keys from the unsecure keys unless you have $k$.

$G_k$ is the strong key generator. 
Given a random seed $G_k$ produces a strong key.
It has the property that even given many many secure keys and weak keys, one can not learn any information about $G_k$ or $k$.

$A_k$ is the attack function. 
Given some number of ciphertexts encrypted under an insecure key, it will determine the plaintext values.

$$\text{ciphertext} \leftarrow C_{k}\text{.encrypt}( \text{weak_key}, \text{plaintext} ) $$
$$ \text{plaintext} \leftarrow A_{k}(  \text{ciphertext} )$$

**Conclusion:**
If someone can find functions for which the above properties hold, they can generate a cipher which can be used securely by anyone that knows $k$ and not securely by everyone else.
The biggest problem with the scheme is that SpookNet must store all the secure keys it has generated and transmit these keys to its users.
Given the danger of these key being compromised prior to use one would have to develop hardened key stores for physically distributing the keys.

![](http://media.tumblr.com/tumblr_m7abygGg3k1qf5p6p.jpg)

[^1]: A variant of [blowfish](http://en.wikipedia.org/wiki/Blowfish_(cipher)) appears [to be slightly less secure with certain keys than others](http://lasecwww.epfl.ch/php_code/publications/search.php?ref=Vau96a).

[^2]: One version of a built in weakness might be that given a particular plaintext the cipher outputs the key or some data which can be used to discover the key.
