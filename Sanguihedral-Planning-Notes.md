# Sanguihedral Planning Notes

#### 3rd-party API call for rolling dice

I am required to use at least one 3rd-party API in my final project... This is my planned one to use => VampyreByte's V5 API generators (v5api.vampyrebytes.com)
_specifically the dice pools API for performing the actual dice rolls as specified by whatever action the character wishes to perform._

```bash
GET https://v5api.vampyrebytes.com/dice_pool/7/2/3
# where first param = total dice (7), second param = hunger dice (2), 
# and third param = difficulty (3)
```

##### 3rd-party API call for outputting PDFs

###### FOXIT DOCUMENT GENERATION API

[Document Generation API for Automated PDF Workflows | Foxit](https://www.foxit.com/api/document-generation/)

##### Notes

So the new chat hub for school has a bunch of answers for my upcoming final project; specifically the fact that for my custom app I have to make use of at least one 3rd-party API in said app. I found a Vampire v5 API online that I plan to use their dice roll API to make all of the actual rolls and return the results for me to embellish with my blood-soaked d10 images of each number. Bestial failures have a skull (still to pick one) and successes (both normal and critical, differentiated by color) will be the sect symbol (Camarilla, Anarch, or Sabbat) for that specific character. I actually crafted a working GET request a few minutes ago and figured out exactly what I have to send with the request to get my rolls.

So technically, it is no longer a dice-roller but now a character sheet portfolio that also allows automated (mostly) dice rolls. The kicker is that the app gets your total dice pool and hunger straight from your sheet and all you have to tell it is the difficulty that the ST will tell you in the moment.

One thing I do know is that once I hit about 200 characters in the DB (not users) I will have to start paying for the infrastructure to handle the storage and bandwidth requirements. I doubt the Austin group alone will hit that number of charcters for at least a year, but it is something that I need to keep in mind.

The MVP is a React web app with an Express backend. Once that is functional I plan on writing a native client application in Vala to access the same API/IAAS so I can add that language to my learned list.
