// === Constants ===
const pointsKey = "fitnessPoints";
const startDateKey = "startDate";
const workoutLogKey = "workoutLog";
const mealLogKey = "mealLog";

// === State ===
let points = parseFloat(localStorage.getItem(pointsKey)) || 0;
let startDate = localStorage.getItem(startDateKey) || null;
let workoutLog = JSON.parse(localStorage.getItem(workoutLogKey)) || [];
let mealLog = JSON.parse(localStorage.getItem(mealLogKey)) || [];

// === DOM ===
const canvas = document.getElementById("progressCanvas");
const ctx = canvas.getContext("2d");

const bodyWeightInput = document.getElementById("bodyWeightLbs");
const bodyWeightKgDisplay = document.getElementById("bodyWeightKgDisplay");

const quoteBox = document.getElementById("quoteBox");
const newQuoteBtn = document.getElementById("newQuoteBtn");

// === Quotes ===
const quotes = [
  "Motivation gets you started, habit keeps you going. (Quote #1)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #2)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #3)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #4)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #5)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #6)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #7)",
  "Success starts with self-discipline. (Quote #8)",
  "Discipline is choosing between what you want now and what you want most. (Quote #9)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #10)",
  "Pain is temporary, pride is forever. (Quote #11)",
  "No pain, no gain. Shut up and train. (Quote #12)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #13)",
  "Discipline is choosing between what you want now and what you want most. (Quote #14)",
  "The only bad workout is the one that didn’t happen. (Quote #15)",
  "Pain is temporary, pride is forever. (Quote #16)",
  "Motivation gets you started, habit keeps you going. (Quote #17)",
  "Strive for progress, not perfection. (Quote #18)",
  "Discipline is choosing between what you want now and what you want most. (Quote #19)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #20)",
  "No pain, no gain. Shut up and train. (Quote #21)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #22)",
  "Discipline is choosing between what you want now and what you want most. (Quote #23)",
  "Pain is temporary, pride is forever. (Quote #24)",
  "Success starts with self-discipline. (Quote #25)",
  "Strive for progress, not perfection. (Quote #26)",
  "Success starts with self-discipline. (Quote #27)",
  "Discipline is choosing between what you want now and what you want most. (Quote #28)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #29)",
  "Pain is temporary, pride is forever. (Quote #30)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #31)",
  "No pain, no gain. Shut up and train. (Quote #32)",
  "Discipline is choosing between what you want now and what you want most. (Quote #33)",
  "No pain, no gain. Shut up and train. (Quote #34)",
  "No pain, no gain. Shut up and train. (Quote #35)",
  "The only bad workout is the one that didn’t happen. (Quote #36)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #37)",
  "Success starts with self-discipline. (Quote #38)",
  "No pain, no gain. Shut up and train. (Quote #39)",
  "Motivation gets you started, habit keeps you going. (Quote #40)",
  "Discipline is choosing between what you want now and what you want most. (Quote #41)",
  "Pain is temporary, pride is forever. (Quote #42)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #43)",
  "Pain is temporary, pride is forever. (Quote #44)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #45)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #46)",
  "Success starts with self-discipline. (Quote #47)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #48)",
  "Success starts with self-discipline. (Quote #49)",
  "Success starts with self-discipline. (Quote #50)",
  "Strive for progress, not perfection. (Quote #51)",
  "Success starts with self-discipline. (Quote #52)",
  "Pain is temporary, pride is forever. (Quote #53)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #54)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #55)",
  "Success starts with self-discipline. (Quote #56)",
  "Discipline is choosing between what you want now and what you want most. (Quote #57)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #58)",
  "Discipline is choosing between what you want now and what you want most. (Quote #59)",
  "Pain is temporary, pride is forever. (Quote #60)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #61)",
  "The only bad workout is the one that didn’t happen. (Quote #62)",
  "The only bad workout is the one that didn’t happen. (Quote #63)",
  "Motivation gets you started, habit keeps you going. (Quote #64)",
  "The only bad workout is the one that didn’t happen. (Quote #65)",
  "Pain is temporary, pride is forever. (Quote #66)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #67)",
  "No pain, no gain. Shut up and train. (Quote #68)",
  "Success starts with self-discipline. (Quote #69)",
  "Discipline is choosing between what you want now and what you want most. (Quote #70)",
  "The only bad workout is the one that didn’t happen. (Quote #71)",
  "The only bad workout is the one that didn’t happen. (Quote #72)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #73)",
  "Motivation gets you started, habit keeps you going. (Quote #74)",
  "Pain is temporary, pride is forever. (Quote #75)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #76)",
  "Pain is temporary, pride is forever. (Quote #77)",
  "Success starts with self-discipline. (Quote #78)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #79)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #80)",
  "Pain is temporary, pride is forever. (Quote #81)",
  "Strive for progress, not perfection. (Quote #82)",
  "Strive for progress, not perfection. (Quote #83)",
  "Discipline is choosing between what you want now and what you want most. (Quote #84)",
  "Motivation gets you started, habit keeps you going. (Quote #85)",
  "Pain is temporary, pride is forever. (Quote #86)",
  "Pain is temporary, pride is forever. (Quote #87)",
  "Discipline is choosing between what you want now and what you want most. (Quote #88)",
  "The only bad workout is the one that didn’t happen. (Quote #89)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #90)",
  "Pain is temporary, pride is forever. (Quote #91)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #92)",
  "The only bad workout is the one that didn’t happen. (Quote #93)",
  "Discipline is choosing between what you want now and what you want most. (Quote #94)",
  "Success starts with self-discipline. (Quote #95)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #96)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #97)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #98)",
  "Pain is temporary, pride is forever. (Quote #99)",
  "Strive for progress, not perfection. (Quote #100)",
  "Success starts with self-discipline. (Quote #101)",
  "The only bad workout is the one that didn’t happen. (Quote #102)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #103)",
  "Discipline is choosing between what you want now and what you want most. (Quote #104)",
  "The only bad workout is the one that didn’t happen. (Quote #105)",
  "Pain is temporary, pride is forever. (Quote #106)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #107)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #108)",
  "Success starts with self-discipline. (Quote #109)",
  "Motivation gets you started, habit keeps you going. (Quote #110)",
  "No pain, no gain. Shut up and train. (Quote #111)",
  "No pain, no gain. Shut up and train. (Quote #112)",
  "Strive for progress, not perfection. (Quote #113)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #114)",
  "Success starts with self-discipline. (Quote #115)",
  "Success starts with self-discipline. (Quote #116)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #117)",
  "Discipline is choosing between what you want now and what you want most. (Quote #118)",
  "Motivation gets you started, habit keeps you going. (Quote #119)",
  "Motivation gets you started, habit keeps you going. (Quote #120)",
  "Motivation gets you started, habit keeps you going. (Quote #121)",
  "Strive for progress, not perfection. (Quote #122)",
  "Strive for progress, not perfection. (Quote #123)",
  "The only bad workout is the one that didn’t happen. (Quote #124)",
  "No pain, no gain. Shut up and train. (Quote #125)",
  "Discipline is choosing between what you want now and what you want most. (Quote #126)",
  "Strive for progress, not perfection. (Quote #127)",
  "Pain is temporary, pride is forever. (Quote #128)",
  "Discipline is choosing between what you want now and what you want most. (Quote #129)",
  "Discipline is choosing between what you want now and what you want most. (Quote #130)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #131)",
  "Discipline is choosing between what you want now and what you want most. (Quote #132)",
  "Discipline is choosing between what you want now and what you want most. (Quote #133)",
  "Success starts with self-discipline. (Quote #134)",
  "Success starts with self-discipline. (Quote #135)",
  "Motivation gets you started, habit keeps you going. (Quote #136)",
  "Success starts with self-discipline. (Quote #137)",
  "Motivation gets you started, habit keeps you going. (Quote #138)",
  "Success starts with self-discipline. (Quote #139)",
  "Pain is temporary, pride is forever. (Quote #140)",
  "Motivation gets you started, habit keeps you going. (Quote #141)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #142)",
  "Motivation gets you started, habit keeps you going. (Quote #143)",
  "Motivation gets you started, habit keeps you going. (Quote #144)",
  "No pain, no gain. Shut up and train. (Quote #145)",
  "Discipline is choosing between what you want now and what you want most. (Quote #146)",
  "No pain, no gain. Shut up and train. (Quote #147)",
  "Strive for progress, not perfection. (Quote #148)",
  "The only bad workout is the one that didn’t happen. (Quote #149)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #150)",
  "Strive for progress, not perfection. (Quote #151)",
  "Pain is temporary, pride is forever. (Quote #152)",
  "The only bad workout is the one that didn’t happen. (Quote #153)",
  "Discipline is choosing between what you want now and what you want most. (Quote #154)",
  "Strive for progress, not perfection. (Quote #155)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #156)",
  "Motivation gets you started, habit keeps you going. (Quote #157)",
  "Strive for progress, not perfection. (Quote #158)",
  "The only bad workout is the one that didn’t happen. (Quote #159)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #160)",
  "Strive for progress, not perfection. (Quote #161)",
  "No pain, no gain. Shut up and train. (Quote #162)",
  "The only bad workout is the one that didn’t happen. (Quote #163)",
  "Success starts with self-discipline. (Quote #164)",
  "Strive for progress, not perfection. (Quote #165)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #166)",
  "Success starts with self-discipline. (Quote #167)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #168)",
  "Success starts with self-discipline. (Quote #169)",
  "Discipline is choosing between what you want now and what you want most. (Quote #170)",
  "The only bad workout is the one that didn’t happen. (Quote #171)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #172)",
  "Success starts with self-discipline. (Quote #173)",
  "Pain is temporary, pride is forever. (Quote #174)",
  "Success starts with self-discipline. (Quote #175)",
  "Discipline is choosing between what you want now and what you want most. (Quote #176)",
  "Success starts with self-discipline. (Quote #177)",
  "The only bad workout is the one that didn’t happen. (Quote #178)",
  "Strive for progress, not perfection. (Quote #179)",
  "Motivation gets you started, habit keeps you going. (Quote #180)",
  "The only bad workout is the one that didn’t happen. (Quote #181)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #182)",
  "Strive for progress, not perfection. (Quote #183)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #184)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #185)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #186)",
  "No pain, no gain. Shut up and train. (Quote #187)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #188)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #189)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #190)",
  "Motivation gets you started, habit keeps you going. (Quote #191)",
  "The only bad workout is the one that didn’t happen. (Quote #192)",
  "No pain, no gain. Shut up and train. (Quote #193)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #194)",
  "Strive for progress, not perfection. (Quote #195)",
  "Pain is temporary, pride is forever. (Quote #196)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #197)",
  "Discipline is choosing between what you want now and what you want most. (Quote #198)",
  "Success starts with self-discipline. (Quote #199)",
  "The only bad workout is the one that didn’t happen. (Quote #200)",
  "Motivation gets you started, habit keeps you going. (Quote #201)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #202)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #203)",
  "Pain is temporary, pride is forever. (Quote #204)",
  "Success starts with self-discipline. (Quote #205)",
  "Pain is temporary, pride is forever. (Quote #206)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #207)",
  "Discipline is choosing between what you want now and what you want most. (Quote #208)",
  "The only bad workout is the one that didn’t happen. (Quote #209)",
  "The only bad workout is the one that didn’t happen. (Quote #210)",
  "The only bad workout is the one that didn’t happen. (Quote #211)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #212)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #213)",
  "Success starts with self-discipline. (Quote #214)",
  "The only bad workout is the one that didn’t happen. (Quote #215)",
  "The only bad workout is the one that didn’t happen. (Quote #216)",
  "Pain is temporary, pride is forever. (Quote #217)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #218)",
  "Pain is temporary, pride is forever. (Quote #219)",
  "Pain is temporary, pride is forever. (Quote #220)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #221)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #222)",
  "No pain, no gain. Shut up and train. (Quote #223)",
  "Success starts with self-discipline. (Quote #224)",
  "Motivation gets you started, habit keeps you going. (Quote #225)",
  "Motivation gets you started, habit keeps you going. (Quote #226)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #227)",
  "The only bad workout is the one that didn’t happen. (Quote #228)",
  "Motivation gets you started, habit keeps you going. (Quote #229)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #230)",
  "Motivation gets you started, habit keeps you going. (Quote #231)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #232)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #233)",
  "The only bad workout is the one that didn’t happen. (Quote #234)",
  "Success starts with self-discipline. (Quote #235)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #236)",
  "Success starts with self-discipline. (Quote #237)",
  "Discipline is choosing between what you want now and what you want most. (Quote #238)",
  "Success starts with self-discipline. (Quote #239)",
  "Pain is temporary, pride is forever. (Quote #240)",
  "Success starts with self-discipline. (Quote #241)",
  "Motivation gets you started, habit keeps you going. (Quote #242)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #243)",
  "Discipline is choosing between what you want now and what you want most. (Quote #244)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #245)",
  "The only bad workout is the one that didn’t happen. (Quote #246)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #247)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #248)",
  "Strive for progress, not perfection. (Quote #249)",
  "Discipline is choosing between what you want now and what you want most. (Quote #250)",
  "Success starts with self-discipline. (Quote #251)",
  "Motivation gets you started, habit keeps you going. (Quote #252)",
  "Discipline is choosing between what you want now and what you want most. (Quote #253)",
  "Discipline is choosing between what you want now and what you want most. (Quote #254)",
  "Strive for progress, not perfection. (Quote #255)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #256)",
  "Strive for progress, not perfection. (Quote #257)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #258)",
  "Strive for progress, not perfection. (Quote #259)",
  "Strive for progress, not perfection. (Quote #260)",
  "Strive for progress, not perfection. (Quote #261)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #262)",
  "Strive for progress, not perfection. (Quote #263)",
  "Discipline is choosing between what you want now and what you want most. (Quote #264)",
  "Pain is temporary, pride is forever. (Quote #265)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #266)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #267)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #268)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #269)",
  "Success starts with self-discipline. (Quote #270)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #271)",
  "No pain, no gain. Shut up and train. (Quote #272)",
  "Success starts with self-discipline. (Quote #273)",
  "The only bad workout is the one that didn’t happen. (Quote #274)",
  "The only bad workout is the one that didn’t happen. (Quote #275)",
  "The only bad workout is the one that didn’t happen. (Quote #276)",
  "Strive for progress, not perfection. (Quote #277)",
  "Discipline is choosing between what you want now and what you want most. (Quote #278)",
  "The only bad workout is the one that didn’t happen. (Quote #279)",
  "Discipline is choosing between what you want now and what you want most. (Quote #280)",
  "Discipline is choosing between what you want now and what you want most. (Quote #281)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #282)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #283)",
  "No pain, no gain. Shut up and train. (Quote #284)",
  "The only bad workout is the one that didn’t happen. (Quote #285)",
  "The only bad workout is the one that didn’t happen. (Quote #286)",
  "The only bad workout is the one that didn’t happen. (Quote #287)",
  "Motivation gets you started, habit keeps you going. (Quote #288)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #289)",
  "The only bad workout is the one that didn’t happen. (Quote #290)",
  "No pain, no gain. Shut up and train. (Quote #291)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #292)",
  "Pain is temporary, pride is forever. (Quote #293)",
  "Success starts with self-discipline. (Quote #294)",
  "Pain is temporary, pride is forever. (Quote #295)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #296)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #297)",
  "Strive for progress, not perfection. (Quote #298)",
  "Success starts with self-discipline. (Quote #299)",
  "Success starts with self-discipline. (Quote #300)",
  "Motivation gets you started, habit keeps you going. (Quote #301)",
  "Strive for progress, not perfection. (Quote #302)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #303)",
  "Success starts with self-discipline. (Quote #304)",
  "Success starts with self-discipline. (Quote #305)",
  "No pain, no gain. Shut up and train. (Quote #306)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #307)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #308)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #309)",
  "Discipline is choosing between what you want now and what you want most. (Quote #310)",
  "Success starts with self-discipline. (Quote #311)",
  "Success starts with self-discipline. (Quote #312)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #313)",
  "Success starts with self-discipline. (Quote #314)",
  "Success starts with self-discipline. (Quote #315)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #316)",
  "Pain is temporary, pride is forever. (Quote #317)",
  "Discipline is choosing between what you want now and what you want most. (Quote #318)",
  "Success starts with self-discipline. (Quote #319)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #320)",
  "The only bad workout is the one that didn’t happen. (Quote #321)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #322)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #323)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #324)",
  "No pain, no gain. Shut up and train. (Quote #325)",
  "Motivation gets you started, habit keeps you going. (Quote #326)",
  "Pain is temporary, pride is forever. (Quote #327)",
  "Pain is temporary, pride is forever. (Quote #328)",
  "Discipline is choosing between what you want now and what you want most. (Quote #329)",
  "Success starts with self-discipline. (Quote #330)",
  "No pain, no gain. Shut up and train. (Quote #331)",
  "Motivation gets you started, habit keeps you going. (Quote #332)",
  "Motivation gets you started, habit keeps you going. (Quote #333)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #334)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #335)",
  "No pain, no gain. Shut up and train. (Quote #336)",
  "No pain, no gain. Shut up and train. (Quote #337)",
  "Strive for progress, not perfection. (Quote #338)",
  "Motivation gets you started, habit keeps you going. (Quote #339)",
  "Pain is temporary, pride is forever. (Quote #340)",
  "Pain is temporary, pride is forever. (Quote #341)",
  "Success starts with self-discipline. (Quote #342)",
  "Pain is temporary, pride is forever. (Quote #343)",
  "Strive for progress, not perfection. (Quote #344)",
  "No pain, no gain. Shut up and train. (Quote #345)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #346)",
  "Pain is temporary, pride is forever. (Quote #347)",
  "Motivation gets you started, habit keeps you going. (Quote #348)",
  "Strive for progress, not perfection. (Quote #349)",
  "The only bad workout is the one that didn’t happen. (Quote #350)",
  "No pain, no gain. Shut up and train. (Quote #351)",
  "Strive for progress, not perfection. (Quote #352)",
  "No pain, no gain. Shut up and train. (Quote #353)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #354)",
  "Motivation gets you started, habit keeps you going. (Quote #355)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #356)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #357)",
  "Success starts with self-discipline. (Quote #358)",
  "The only bad workout is the one that didn’t happen. (Quote #359)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #360)",
  "Strive for progress, not perfection. (Quote #361)",
  "Success starts with self-discipline. (Quote #362)",
  "The only bad workout is the one that didn’t happen. (Quote #363)",
  "Discipline is choosing between what you want now and what you want most. (Quote #364)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #365)",
  "Discipline is choosing between what you want now and what you want most. (Quote #366)",
  "Strive for progress, not perfection. (Quote #367)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #368)",
  "Strive for progress, not perfection. (Quote #369)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #370)",
  "The only bad workout is the one that didn’t happen. (Quote #371)",
  "Success starts with self-discipline. (Quote #372)",
  "Motivation gets you started, habit keeps you going. (Quote #373)",
  "Strive for progress, not perfection. (Quote #374)",
  "Success starts with self-discipline. (Quote #375)",
  "Success starts with self-discipline. (Quote #376)",
  "Discipline is choosing between what you want now and what you want most. (Quote #377)",
  "No pain, no gain. Shut up and train. (Quote #378)",
  "Success starts with self-discipline. (Quote #379)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #380)",
  "Pain is temporary, pride is forever. (Quote #381)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #382)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #383)",
  "Success starts with self-discipline. (Quote #384)",
  "Pain is temporary, pride is forever. (Quote #385)",
  "Discipline is choosing between what you want now and what you want most. (Quote #386)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #387)",
  "No pain, no gain. Shut up and train. (Quote #388)",
  "Discipline is choosing between what you want now and what you want most. (Quote #389)",
  "Success starts with self-discipline. (Quote #390)",
  "No pain, no gain. Shut up and train. (Quote #391)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #392)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #393)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #394)",
  "Motivation gets you started, habit keeps you going. (Quote #395)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #396)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #397)",
  "Discipline is choosing between what you want now and what you want most. (Quote #398)",
  "Discipline is choosing between what you want now and what you want most. (Quote #399)",
  "Motivation gets you started, habit keeps you going. (Quote #400)",
  "Discipline is choosing between what you want now and what you want most. (Quote #401)",
  "Strive for progress, not perfection. (Quote #402)",
  "Success starts with self-discipline. (Quote #403)",
  "Discipline is choosing between what you want now and what you want most. (Quote #404)",
  "Pain is temporary, pride is forever. (Quote #405)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #406)",
  "Success starts with self-discipline. (Quote #407)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #408)",
  "Pain is temporary, pride is forever. (Quote #409)",
  "Pain is temporary, pride is forever. (Quote #410)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #411)",
  "Pain is temporary, pride is forever. (Quote #412)",
  "The only bad workout is the one that didn’t happen. (Quote #413)",
  "Pain is temporary, pride is forever. (Quote #414)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #415)",
  "Strive for progress, not perfection. (Quote #416)",
  "Discipline is choosing between what you want now and what you want most. (Quote #417)",
  "Strive for progress, not perfection. (Quote #418)",
  "The only bad workout is the one that didn’t happen. (Quote #419)",
  "Discipline is choosing between what you want now and what you want most. (Quote #420)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #421)",
  "The only bad workout is the one that didn’t happen. (Quote #422)",
  "No pain, no gain. Shut up and train. (Quote #423)",
  "The only bad workout is the one that didn’t happen. (Quote #424)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #425)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #426)",
  "No pain, no gain. Shut up and train. (Quote #427)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #428)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #429)",
  "The only bad workout is the one that didn’t happen. (Quote #430)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #431)",
  "Strive for progress, not perfection. (Quote #432)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #433)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #434)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #435)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #436)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #437)",
  "The only bad workout is the one that didn’t happen. (Quote #438)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #439)",
  "The only bad workout is the one that didn’t happen. (Quote #440)",
  "Discipline is choosing between what you want now and what you want most. (Quote #441)",
  "Success starts with self-discipline. (Quote #442)",
  "No pain, no gain. Shut up and train. (Quote #443)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #444)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #445)",
  "No pain, no gain. Shut up and train. (Quote #446)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #447)",
  "Discipline is choosing between what you want now and what you want most. (Quote #448)",
  "No pain, no gain. Shut up and train. (Quote #449)",
  "No pain, no gain. Shut up and train. (Quote #450)",
  "Pain is temporary, pride is forever. (Quote #451)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #452)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #453)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #454)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #455)",
  "Motivation gets you started, habit keeps you going. (Quote #456)",
  "No pain, no gain. Shut up and train. (Quote #457)",
  "No pain, no gain. Shut up and train. (Quote #458)",
  "Pain is temporary, pride is forever. (Quote #459)",
  "No pain, no gain. Shut up and train. (Quote #460)",
  "The only bad workout is the one that didn’t happen. (Quote #461)",
  "No pain, no gain. Shut up and train. (Quote #462)",
  "Pain is temporary, pride is forever. (Quote #463)",
  "Success starts with self-discipline. (Quote #464)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #465)",
  "Strive for progress, not perfection. (Quote #466)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #467)",
  "Success starts with self-discipline. (Quote #468)",
  "The only bad workout is the one that didn’t happen. (Quote #469)",
  "Success starts with self-discipline. (Quote #470)",
  "Discipline is choosing between what you want now and what you want most. (Quote #471)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #472)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #473)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #474)",
  "Motivation gets you started, habit keeps you going. (Quote #475)",
  "Discipline is choosing between what you want now and what you want most. (Quote #476)",
  "Discipline is choosing between what you want now and what you want most. (Quote #477)",
  "Motivation gets you started, habit keeps you going. (Quote #478)",
  "Strive for progress, not perfection. (Quote #479)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #480)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #481)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #482)",
  "No pain, no gain. Shut up and train. (Quote #483)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #484)",
  "Discipline is choosing between what you want now and what you want most. (Quote #485)",
  "Discipline is choosing between what you want now and what you want most. (Quote #486)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #487)",
  "Pain is temporary, pride is forever. (Quote #488)",
  "Success starts with self-discipline. (Quote #489)",
  "Pain is temporary, pride is forever. (Quote #490)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #491)",
  "The only bad workout is the one that didn’t happen. (Quote #492)",
  "Discipline is choosing between what you want now and what you want most. (Quote #493)",
  "Strive for progress, not perfection. (Quote #494)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #495)",
  "Pain is temporary, pride is forever. (Quote #496)",
  "Strive for progress, not perfection. (Quote #497)",
  "No pain, no gain. Shut up and train. (Quote #498)",
  "Fitness is not about being better than someone else, it's about being better than you used to be. (Quote #499)",
  "Motivation gets you started, habit keeps you going. (Quote #500)",
  "Pain is temporary, pride is forever. (Quote #501)",
  "Strive for progress, not perfection. (Quote #502)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #503)",
  "Push harder than yesterday if you want a different tomorrow. (Quote #504)",
  "Pain is temporary, pride is forever. (Quote #505)",
  "No pain, no gain. Shut up and train. (Quote #506)",
  "The only bad workout is the one that didn’t happen. (Quote #507)",
  "No pain, no gain. Shut up and train. (Quote #508)",
  "Your body can stand almost anything. It’s your mind that you have to convince. (Quote #509)",
  "The only bad workout is the one that didn’t happen. (Quote #510)"
];

// === Core Functions ===

function drawProgress() {
  ctx.clearRect(0, 0, 200, 200);
  const percent = Math.min(points / 45, 1);
  const angle = percent * 2 * Math.PI;

  // Background Circle
  ctx.beginPath();
  ctx.arc(100, 100, 80, 0, 2 * Math.PI);
  ctx.strokeStyle = "#ccc";
  ctx.lineWidth = 15;
  ctx.stroke();

  // Foreground Arc
  ctx.beginPath();
  ctx.arc(100, 100, 80, -Math.PI / 2, angle - Math.PI / 2);
  ctx.strokeStyle = "#28a745";
  ctx.lineWidth = 15;
  ctx.stroke();

  // Text
  ctx.font = "20px Arial";
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.fillText(`${points.toFixed(1)} / 45`, 100, 110);
}

function logAction(type) {
  if (type === "gym") points += 1;
  else if (type === "off") points -= 2;
  else if (type === "unhealthy") points -= 0.5;

  if (points < 0) points = 0;

  localStorage.setItem(pointsKey, points);
  drawProgress();
  renderPointsChart();
}

function setStartDate(dateStr) {
  startDate = dateStr;
  localStorage.setItem(startDateKey, startDate);
  calculateMissedDaysPenalty();
}

function calculateMissedDaysPenalty() {
  if (!startDate) return;

  const now = new Date();
  const start = new Date(startDate);
  const daysSinceStart = Math.floor((now - start) / (1000 * 60 * 60 * 24));

  const workoutDates = new Set(workoutLog.map(e => e.date));
  let penalty = 0;
  for (let i = 0; i < daysSinceStart; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const d = day.toISOString().split("T")[0];
    if (!workoutDates.has(d)) penalty -= 2;
  }

  points += penalty;
  if (points < 0) points = 0;
  localStorage.setItem(pointsKey, points);
  drawProgress();
  renderPointsChart();
}

// === Weight Conversion Display ===
function updateWeightKgDisplay() {
  const lbs = parseFloat(bodyWeightInput.value);
  if (!isNaN(lbs) && lbs > 0) {
    const kg = (lbs * 0.453592).toFixed(2);
    bodyWeightKgDisplay.textContent = `(${kg} kg)`;
  } else {
    bodyWeightKgDisplay.textContent = "";
  }
}

bodyWeightInput.addEventListener("input", updateWeightKgDisplay);

// === Log Forms ===

document.getElementById("workoutForm").addEventListener("submit", e => {
  e.preventDefault();
  const weightLbs = +document.getElementById("weight").value;
  const weightKg = +(weightLbs * 0.453592).toFixed(2);

  const entry = {
    date: document.getElementById("workoutDate").value,
    muscle: document.getElementById("muscleGroup").value,
    exercise: document.getElementById("exerciseName").value,
    reps: +document.getElementById("reps").value,
    weightLbs,
    weightKg,
    rest: +document.getElementById("restTime").value,
    notes: document.getElementById("notes").value
  };
  workoutLog.push(entry);
  localStorage.setItem(workoutLogKey, JSON.stringify(workoutLog));
  renderWorkoutLog();
  points += 1;
  localStorage.setItem(pointsKey, points);
  drawProgress();
  renderPointsChart();
  e.target.reset();
});

function renderWorkoutLog() {
  const table = document.getElementById("workoutLogTable");
  table.innerHTML = "<tr><th>Date</th><th>Muscle</th><th>Exercise</th><th>Reps</th><th>Weight</th><th>Rest</th><th>Notes</th></tr>";
  workoutLog.forEach(e => {
    const weightDisplay = e.weightLbs + " lbs (" + e.weightKg + " kg)";
    const row = `<tr>
      <td>${e.date}</td>
      <td>${e.muscle}</td>
      <td>${e.exercise}</td>
      <td>${e.reps}</td>
      <td>${weightDisplay}</td>
      <td>${e.rest}</td>
      <td>${e.notes}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

document.getElementById("mealForm").addEventListener("submit", e => {
  e.preventDefault();
  const entry = {
    date: document.getElementById("mealDate").value,
    weight: +document.getElementById("bodyWeightLbs").value,
    carbs: +document.getElementById("carbs").value,
    proteins: +document.getElementById("proteins").value,
    fats: +document.getElementById("fats").value,
    calories: +document.getElementById("calories").value,
    creatine: +document.getElementById("creatine").value,
    bcaas: +document.getElementById("bcaas").value,
    water: +document.getElementById("waterIntake").value
  };
  mealLog.push(entry);
  localStorage.setItem(mealLogKey, JSON.stringify(mealLog));
  renderMealLog();
  renderWeightChart();
  e.target.reset();
  updateWeightKgDisplay();
});

function renderMealLog() {
  const table = document.getElementById("mealLogTable");
  table.innerHTML = "<tr><th>Date</th><th>Weight (lbs)</th><th>Weight (kg)</th><th>Carbs</th><th>Proteins</th><th>Fats</th><th>Calories</th><th>Creatine</th><th>BCAAs</th><th>Water</th></tr>";
  mealLog.forEach(e => {
    const kg = e.weight ? (e.weight * 0.453592).toFixed(2) : "";
    const row = `<tr>
      <td>${e.date}</td>
      <td>${e.weight}</td>
      <td>${kg}</td>
      <td>${e.carbs}</td>
      <td>${e.proteins}</td>
      <td>${e.fats}</td>
      <td>${e.calories}</td>
      <td>${e.creatine}</td>
      <td>${e.bcaas}</td>
      <td>${e.water}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

// === Motivation ===
function newQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBox.textContent = `"${q}"`;
}
newQuoteBtn.addEventListener("click", newQuote);

// === Export / Import / Reset ===
function exportData() {
  const blob = new Blob([JSON.stringify({
    points,
    startDate,
    workoutLog,
    mealLog
  }, null, 2)], { type: "application/json" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "fitness_tracker_data.json";
  a.click();
}

document.getElementById("importFile").addEventListener("change", event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const data = JSON.parse(e.target.result);
    points = data.points || 0;
    startDate = data.startDate || null;
    workoutLog = data.workoutLog || [];
    mealLog = data.mealLog || [];
    localStorage.setItem(pointsKey, points);
    localStorage.setItem(startDateKey, startDate);
    localStorage.setItem(workoutLogKey, JSON.stringify(workoutLog));
    localStorage.setItem(mealLogKey, JSON.stringify(mealLog));
    drawProgress();
    renderWorkoutLog();
    renderMealLog();
    renderWeightChart();
    renderPointsChart();
  };
  reader.readAsText(file);
});

function resetAll() {
  if (confirm("Are you sure you want to reset all data?")) {
    points = 0;
    startDate = null;
    workoutLog = [];
    mealLog = [];
    localStorage.clear();
    drawProgress();
    renderWorkoutLog();
    renderMealLog();
    renderWeightChart();
    renderPointsChart();
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// === Charts using Chart.js ===
let weightChart = null;
let pointsChart = null;

function renderWeightChart() {
  const ctx = document.getElementById('weightChart').getContext('2d');
  if (weightChart) weightChart.destroy();

  const labels = mealLog.map(e => e.date);
  const dataKg = mealLog.map(e => +(e.weight * 0.453592).toFixed(2));

  weightChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Weight (kg)',
        data: dataKg,
        fill: false,
        borderColor: '#28a745',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: 'Date' }
        },
        y: {
          title: { display: true, text: 'Weight (kg)' }
        }
      }
    }
  });
}

function renderPointsChart() {
  const ctx = document.getElementById('pointsChart').getContext('2d');
  if (pointsChart) pointsChart.destroy();

  pointsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Fitness Points'],
      datasets: [{
        label: 'Points (out of 45)',
        data: [points.toFixed(1)],
        backgroundColor: '#007bff'
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {
          max: 45,
          min: 0
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// === Init ===
window.onload = () => {
  drawProgress();
  renderWorkoutLog();
  renderMealLog();
  renderWeightChart();
  renderPointsChart();
  newQuote();

  document.getElementById("toggleDarkMode").addEventListener("click", toggleDarkMode);
  document.getElementById("startDate").addEventListener("change", (e) => setStartDate(e.target.value));

  if (startDate) {
    document.getElementById("startDate").value = startDate;
    calculateMissedDaysPenalty();
  }

  updateWeightKgDisplay();
};
