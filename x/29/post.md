
<div class="asciiart">
<span class="asciiart-bgwhite">Timeline of the Dec 2022 Circle-CI Hack</span>

 <span class="asciiart-bgred">Undetected                             </span><span class="asciiart-bgorange">Detected       </span><span class="asciiart-bgblue">Mitigation                  </span>
 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
 ┼──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┼──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──
 │                            ┌─────────┴────────────┐
 │                            │Dec 30 2022           │
 │                            │ Attack discovered by │
 │                            │ Circle-CI customer   │          
 │                            └─────────┬────────────┘
 │                                      ▼
 │                                      <span class="asciiart-blue">Investigation (5 days)</span> 
┌┴──────────────────────────────┐       <span class="asciiart-blue">[──────────────]</span>
│Dec 16 2022                    │                      <span class="asciiart-blue">Rotating secrets (5 days)</span> 
│ Attacker compromises laptop of│                      <span class="asciiart-blue">[──────────]</span>
│ Circle-CI Employee and steals │                          
│ employee's access secret      │
└┬──────────────────────────────┘                      <span class="asciiart-blue">Determining extent of AWS</span> 
 │                                                      <span class="asciiart-blue">tokens theft (9 days)</span> 
 ▼                                                     <span class="asciiart-blue">[──────────────────────────]</span>
 <span class="asciiart-red">Attacker access via credential theft (18 days)</span>                             
 <span class="asciiart-red">[─────────────────────────────────────────────────────]</span>
                                                       ▲
        <span class="asciiart-red">Attacker recon (4 days)</span>                       ┌┴──────────────────────────┐
        <span class="asciiart-red">[───────────]</span>                                 │Jan 4 2023                 │
                                                      │ Exployee's credentials    │
                                                      │ that attacker compromised │
                   <span class="asciiart-red">Credential harvesting</span>              | are revoked               |
 Day               <span class="asciiart-red">?───────────────────?</span>              └┬──────────────────────────┘
 ┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┼──┬──┬──┬──┬──┬──┬──┬──┬──┬──
 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28     
 <span class="asciiart-red">Observe</span>         
 <span class="asciiart-red">──────► Orient</span>   
       <span class="asciiart-red">────────────► Decide & Act</span>                                   
 <span class="asciiart-blue">Observe</span>           <span class="asciiart-red">────────────────────────────────────►???</span>                                                                    
 <span class="asciiart-blue">────────────────────────────────────────► Orient</span>
                                         <span class="asciiart-blue">──────────────► Decide & Act & Orient</span>
                                                       <span class="asciiart-blue">───────────────────────────►</span>

</div>


This timeline is based on [the incident published by Circle-CI on Jan 13, 2023.](https://circleci.com/blog/jan-4-2023-incident-report/#how-do-we-know-this-attack-vector-is-closed-and-its-safe-to-build). This post is based on [some writing I originally did on mastodon](https://hexagon.space/@ethan_heilman/109705011088622086).

## My Thoughts on the timeline

* 7 days before attacker managed to exfil secrets. If attack had been discovered within those 7 days, impact would have been minimal. Early detection is critical but it doesn't need to be instantious to be extremely valuable.
* 14 days from compromise of developer creds to discovery of attack.
* 4 days from being alerted to the compromise to Circle-CI understanding that they were compromised. Analysis of data and building context introduce significant latencies into the decision making process.
* 3 days to rotate all the github access tokens. Imagine if rotating access tokens could happen instantly?

## Are Github issued OIDC tokens the answer?

> "Here are recommendations customers can take to increase pipeline security:
> Use OIDC tokens wherever possible to avoid storing long-lived credentials in CircleCI.
> Take advantage of IP ranges to limit inbound connections to your systems to only known IP addresses."
> 
> [Circle-CI: What we learned from this incident and what we will do next](https://circleci.com/blog/jan-4-2023-incident-report/#what-we-learned-from-this-incident-and-what-we-will-do-next)

I agree with ~~Circle-CI's conclusion that use of github OIDC tokens~~ would represent a valuable security enhancement and customers that used github OIDC tokens in this way would be less likely to be impacted by this attack. It is the difference between granting Circle-CI access forever vs granting Circle-CI access only when Circle-CI needs that access.

** Edit (April 4 2023):** I got this wrong, Circle CI recommendeded that their customers use Circle CI OIDC Tokens, not Github OIDC Tokens. I still agree that OIDC Tokens from either Circle-CI or Github would improve the security here. 

While OIDC tokens issued by github remove some of the trust placed in Circle-CI they still require trusting github. This is an improvement to be sure, especially if github uses HSMs for their OIDC signing keys. However if the signing key github uses to authorize OIDC tokens was compromised, an attacker could create and sign any OIDC tokens.
Signing key compromise is a threat I think about frequently at [bastionzero.com](https://bastionzero.com) because our core protocol innovation is allowing OIDC users to maintain security even if the OIDC signing key the trust is compromised.

## Timeline Specifics

Day 1 (Dec 16, 2022): Developer at Circle-CI's has their end host compromised by attacker. Attacker gains the ability authenticate to Circle-Ci as that developer.

Day 3 (Dec 19, 2022): Attacker using developers credentials explores Circle-Ci's network and production environment.

Day 7 (Dec 22, 2022): Exfiltration and harvesting of SSH keys, access tokens, and other auth secrets begins.

At some point later attacker leverages stolen SSH keys, access tokens, and other auth secrets to exploit Circle-CI customers.

Day 14 (Dec 30, 2022): Circle-CI customer notices unauthorized access via a github log and alerts Circle-CI. Circle-CI starts investigation.

Day 19 (Jan 4, 2023): Five days after being alerted to the attack, Circle-CI concludes they have been deeply compromised. They inform their customers of the breach and begin rotating tokens. The revoke the compromised developers access, locking out that access capability the attacker was using.

Day 22 (Jan 6, 2023): Circle-Ci manages to rotate all Bitbucket tokens.

Day 23 (Jan 7, 2023): Circle-CI manages to rotate all github OAuth tokens.

Day 28 (Jan 12, 2023): Circle-CI manages to determine extent of AWS tokens stolen and notifies impacted customers.

Day 29 (Jan 12, 2023): Circle-CI publishes post-mortem of attack investigation.




<!-- <div class="asciiart">

  Day 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
  ────┬─────────────────────────────┬────────────────────────────────────────────────────
      │                            ┌┴─────────────────────┐
      │                            │Dec 30 2022           │
      │                            │ Attack discovered by │
      │                            │ Circle-CI customer   │
      │                            └─────────┬────────────┘
      │                                      │
      │                                      ▼
      │                                      Investigation
      │                                      ────────────────
      │                                              (5 days)
     ┌┴──────────────────────────────┐
     │Dec 16 2022                    │                      Rotating secrets
     │ Attacker compromises laptop of│                      ────────────
     │ Circle-CI Employee and steals │                          (5 days)
     │ employee's access secret      │
     └┬──────────────────────────────┘                      Determining extent of AWS
      │                                                     tokens stole
      ▼                                                     ────────────────────────────
      Attacker access via initial credential theft                              (9 days)
      ───────────────────────────────────────────────────────
                                                    (18 days)
            Attacker recon                                  ▲
            ─────────────                                   │
                 (4 days)                                  ┌┴───────────────────────┐
                                                           │Jan 4 2023              │
                         Credential harvesting             │ Credentials attacker   │
                        ?───────────────────?              │ compromised are revoked│
                                                           └┬───────────────────────┘
                                                            │
  ──────────────────────────────────────────────────────────┴────────────────────────────
  Day 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28

</div> -->

 <!-- ┌───────────────────────────────┐
 │Dec 16 2022                    │
 │ Attacker compromises laptop of│
 │Circle-CI Employee and steals  │
 │employee's access secret       │
 └──┬────────────────────────────┘
    │
    │
    ▼
 <span class="asciiart-red">┌─────────────────────────────────┐</span>
 <span class="asciiart-red">│ Attacker has employee's access  │</span>                
 <span class="asciiart-red">└─────────────────────────────────┘</span> -->