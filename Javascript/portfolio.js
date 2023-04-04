//for click events of navbar
let hamburger=document.getElementById("hamburger");
let wholeNavList=document.getElementById("nav-list-fixed");
let firstDrpdwn=document.getElementById("first-drpdwn");
let firstDrpdwnList=document.getElementById("first-drpdwn-list");
let secondDrpdwn=document.getElementById("second-drpdwn");
let secondDrpdwnList=document.getElementById("second-drpdwn-list");
let rootEle=document.querySelector(":root");
let removeBtn=document.getElementById("removeBtn");

hamburger.addEventListener("click",()=>
{
    wholeNavList.classList.add("show");//toggle means add and remove or remove and add
    wholeNavList.classList.remove("hide");
    if(firstDrpdwnList.classList.contains("show"))//if list was previously opened
    {
        firstDrpdwnList.classList.remove("show");
        firstDrpdwnList.classList.add("hide");
    }
    if(secondDrpdwnList.classList.contains("show"))
    {
        secondDrpdwnList.classList.remove("show");
        secondDrpdwnList.classList.add("hide");
    }
    removeBtn.classList.remove("hide");
    removeBtn.classList.add("show");
    hamburger.classList.add("hide");
    hamburger.classList.remove("show");
    rootEle.style.setProperty("--value","''");
});
removeBtn.onclick=function()
{
    wholeNavList.classList.add("hide");
    wholeNavList.classList.remove("show");
    removeBtn.classList.add("hide");
    removeBtn.classList.remove("show");
    hamburger.classList.remove("hide");
    hamburger.classList.add("show");
    rootEle.style.setProperty("--value","nothing any value");
}
firstDrpdwn.addEventListener("click",()=>
{
    firstDrpdwnList.classList.toggle("show");
    firstDrpdwnList.classList.toggle("hide");
    if(secondDrpdwnList.classList.contains("show"))
    {
        secondDrpdwnList.classList.remove("show");
        secondDrpdwnList.classList.add("hide");
    }
});
secondDrpdwn.addEventListener("click",()=>
{
    secondDrpdwnList.classList.toggle("show");
    secondDrpdwnList.classList.toggle("hide");
});

//text show letter by letter
let professionEle=document.getElementById("profession");
let professionArr=["Designer","Coder","Full Stack Developer","Photographer"];
let colorsArr=["red",'blue',"green","yellow"];
let professionCount=0;
let letterCount=1;
let selectedProfession;
let length;
let intervalForRemove;

showLetterByLetter();
let intervalForShow=setInterval(showLetterByLetter, 300);

function showLetterByLetter()//function to show letter every 30 milliseconds
{
    selectedProfession=professionArr[professionCount];
    let text=selectedProfession.slice(0,letterCount);
    length=selectedProfession.length;
    professionEle.textContent=text;
    professionEle.style.color=colorsArr[professionCount];
    if(letterCount==length)
    {
        clearInterval(intervalForShow);
        intervalForRemove=setInterval(removeLetterByLetter, 100);
    }
    letterCount++;
}
function removeLetterByLetter()
{
    letterCount--;
    if(letterCount==0)//first element in the text is already shown and now it has zero letter to show
    {
        letterCount=0;
        professionCount++;
        if(professionCount==professionArr.length)
            professionCount=0;
        clearInterval(intervalForRemove);
        intervalForShow=setInterval(showLetterByLetter, 300);
    }
    let text=selectedProfession.slice(0,letterCount);
    professionEle.textContent=text;
}

//supporter transformation
let supporters=document.querySelectorAll("#supporter-container > .supporter");
let dots=document.querySelectorAll("#dot-container > .dot");
let prev="first dot";

function clickForSliding()
{
    dots.forEach((dot)=>
    {
        dot.addEventListener("click", function()
        {
            if(!this.classList.contains("active"))
            {
                this.classList.add("active");
                dots.forEach(dt=>
                {
                    if(this!=dt)
                    {
                        dt.classList.remove("active");
                    }
                });
            }
            if(prev=="first dot")
            {
                if(this==dots[1])
                    slide(1);
                else if(this==dots[2])
                    slide(2);
                else
                    slide(3);
            }
            else if(prev=="second dot")//if previously clicked was second dot and currently first dot is clicked
            {
                if(this==dots[0])
                    slide(0);
                else if(this==dots[2])
                    slide(2);
                else
                    slide(3)
            }
            else if(prev=="third dot")
            {
                if(this==dots[0])
                    slide(0)
                else if(this==dots[1])
                    slide(1);
                else
                    slide(3)
            }
            else
            {
                if(this==dots[0])
                slide(0)
                else if(this==dots[1])
                    slide(1);
                else
                    slide(2)
            }
    
            if(this==dots[0])
                prev="first dot";
            else if(this==dot[1])
                prev="second dot";
            else if(this==dot[2])
                prev="third dot";
            else
                prev="fourth dot";
        });
    });
}
clickForSliding();

/*supporters automatic slide sideways*/
let countForTranslate=1;
let leftInterval;
let rightInterval;
let len=supporters.length;//or dots.length as both are same
let i, j;

function slide(countForTranslate)
{
    supporters.forEach(supporter=>
    {
        supporter.style.transform="translateX(calc(-"+countForTranslate+" * 100%))";
    });
}
leftInterval=setInterval(leftSlide, 3000);
function leftSlide()
{
    slide(countForTranslate);
    dots.forEach((dot)=>
    {
        dot.classList.remove("active");
    });
    dots[countForTranslate].classList.add("active");
    // console.log(countForTranslate);
    countForTranslate++;
    if(countForTranslate==len-1)//still confused
    {
        clearInterval(leftInterval);
        rightInterval=setInterval(rightSlide, 3000);
    }
}

function rightSlide()
{
    slide(countForTranslate);
    dots.forEach((dot)=>
    {
        dot.classList.remove("active");
    });
    dots[countForTranslate].classList.add("active");
    countForTranslate--;
    if(countForTranslate==0)
    {
        clearInterval(rightInterval);
        leftInterval=setInterval(leftSlide, 3000);
    }
}

//number increment when the top of the container is reached
let workExpWrapper=document.getElementById("work-exp");
let numEles=document.querySelectorAll("#work-exp > .accomplishment > h3.num");
let numArr=[];
let count=[];
for(i=0;i<numEles.length;i++)
{
    count[i]=0;
    numArr[i]=parseInt(numEles[i].innerText);
    numEles.innerText=count[i];
}
// console.log(numArr);
let windowHeight=window.innerHeight;//height of current window which is visible
let revealHeight=windowHeight - 40;//height where to start incrementing the number
let topOfSection;//for storing top of the element where the counter is to be incremented
let interval=[];
let started=false;//truth value of whether the incrementation has been started or not
console.log(workExpWrapper.getBoundingClientRect().top);// this gives the top of element in current viewport //when its down below in the viewport its value will be more enough than it window height but if it's visible its value ranges from 0 to windowHeight
window.addEventListener("scroll",()=>
{
    topOfSection=workExpWrapper.getBoundingClientRect().top;
   if(topOfSection <= revealHeight) //return started =true when top of Section crosses the revealHeight to start the incrementation processs
   {
        started=true;
        window.dispatchEvent("scroll");//no idea about this one
   }
});
for(i=0;i<numEles.length;i++)
{
    interval[i]=setInterval(increaseNum.bind(window, i), 3500 / numArr[i]);
    // interval[i]=setInterval(increaseNum.bind(window, i), 10);//if we wanna do everything with same interval use time(you want such as 10000) divided by numArr[i]. And 10 here means 1 millisecond
    //bind is used for passing parameters to the setInterval function which was not possible when I simply declared setInterval(increaseNum(i),10);
}
function increaseNum(i)
{
    if(started)
    {
        count[i]++;
        numEles[i].innerText=count[i];
        if(count[i]==numArr[i])
        {
            clearInterval(interval[i]);
        }
    }
}

//skills section % animation increasing
let skillsSection=document.getElementById("skills");
let prcntgNumEles=document.querySelectorAll("#skills > .skill > span > span.prcntg-num");
let gridEles=document.querySelectorAll("#skills > .skill > div.percentage-grid");
let prcntgNums=[];//for storing nums(percentage)
let countForPrcntg=[];
let topOfSkills;
for(i=0;i<prcntgNumEles.length;i++)
{
    countForPrcntg[i]=0
    prcntgNums[i]=parseInt(prcntgNumEles[i].innerText);//parseInt converts string "20" to num 20
    prcntgNumEles[i].innerText=countForPrcntg[i];
}
console.log(prcntgNums)
let increasePrcntgPoint=windowHeight-80;
let prcntgStarted=false;
let intervalForPrcntg=[];
window.onscroll=function()
{
    topOfSkills=skillsSection.getBoundingClientRect().top;
    if(topOfSkills <= increasePrcntgPoint)
        prcntgStarted=true;
}
for(i=0;i<prcntgNumEles.length;i++)
{
    intervalForPrcntg[i]=setInterval(increasePercentageValue.bind(window, i), 3000 / prcntgNums[i]);//if prcntgNums[i]=100; one number increment is done every 3 milliseconds equivalent to 30 here
}
function increasePercentageValue(i)
{
    if(prcntgStarted)
    {
        countForPrcntg[i]++;
        prcntgNumEles[i].innerText=countForPrcntg[i];
        gridEles[i].style="grid-template-columns: "+countForPrcntg[i]+"% auto";
        if(countForPrcntg[i]==prcntgNums[i])
        {
            clearInterval(intervalForPrcntg[i]);
        }
    }
}

//bigger screen navbar scripts
let windowWidth;
//for direct display in devices which doesn't resize its window
makeResponsiveNav();

function makeResponsiveNav()
{
    windowWidth=window.innerWidth;
    if(windowWidth >= 992)
    {
        if(wholeNavList.classList.contains("hide"))
        {
            wholeNavList.classList.remove("hide");
            wholeNavList.classList.add("show");
        }
        if(hamburger.classList.contains("show"))
        {
            hamburger.classList.add("hide");
            hamburger.classList.remove("show");
        }
        if(removeBtn.classList.contains("show"))
        {
            removeBtn.classList.remove("show");
            removeBtn.classList.add("hide");
        }
        firstDrpdwnList.classList.remove("hide");
        firstDrpdwnList.classList.remove("show");
        secondDrpdwnList.classList.remove("hide");
        secondDrpdwnList.classList.remove("show");
    }
    else
    {
        hamburger.classList.add("show");
        hamburger.classList.remove("hide");
        wholeNavList.classList.add("hide");
        wholeNavList.classList.remove("show");
        rootEle.style.setProperty("--value", "any value");
        removeBtn.classList.remove("show");
        removeBtn.classList.add('hide');
        firstDrpdwnList.classList.remove("show");
        firstDrpdwnList.classList.add("hide");
        secondDrpdwnList.classList.remove("show");
        secondDrpdwnList.classList.add("hide");
    }
}
window.onresize=function()
{
    makeResponsiveNav();
}
//for to the top link arrow
let toTopArrow=document.querySelector("main > a");
window.addEventListener("scroll",()=>
{
    if(scrollY>=100)
        toTopArrow.classList.remove("hide");
    else if(scrollY<=20)
        toTopArrow.classList.add("hide");
});

//animation for transition and opacity
let individualEleQuery=["#intro-brief > p:first-child", "#pic-names > img", "#skills > b", "#about-me > h1", "#services > h1", "#portfolio > h1", "#blog-section > h1", "#services > span", "#portfolio > span", "#supporter-container", "#blog-section > span", "#send-us-mssg #fill-form > h1", "#send-us-mssg #get-in-touch > h1", "#fill-form > form > textarea", "#get-in-touch > p:first-of-type", "footer"];
let groupEleQuery=["#pic-names > #name-and-more > p", "#skills > .skill > span", "#about-me > p.about-para", "#services > #service-wrapper > .srvice", "#work-exp > .accomplishment > span.small-circle", "#portfolio > #portfolio-wrapper > .project", "#blog-section > #blogs > .blog", "#fill-form > form > input", "#get-in-touch > p.GIT-para", "#get-in-touch > p.GIT-para > span", "#get-in-touch > span.i-container"];
//"#skills > .skill > div.percentage-grid",//this was not working
let individualEles=[];
let individualElesTop=[];
let groupEles=[];
let groupElesTop=[];

window.addEventListener("scroll",()=>
{
    determineHeightAndAnimate();
});
function determineHeightAndAnimate()
{
    windowHeight=window.innerHeight;
    for(i=0;i<individualEleQuery.length;i++)
    {
        individualEles[i]=document.querySelector(individualEleQuery[i]);
        individualElesTop[i]=individualEles[i].getBoundingClientRect().top;
        if(individualElesTop[i]<=windowHeight)
            individualEles[i].style="animation: bottomToTop 1s forwards;";
    }
    for(i=0;i<groupEleQuery.length;i++)
    {
        // groupEles[i]=[];//this is not needed because below line makes groupEles[] two dimenstional array automatically
        groupEles[i]=document.querySelectorAll(groupEleQuery[i]);
        groupElesTop[i]=[];//needed to make it two dimensional array
        for(j=0;j<groupEles[i].length;j++)
        {
            groupElesTop[i][j]=groupEles[i][j].getBoundingClientRect().top;
            if(groupElesTop[i][j] <= windowHeight)
                groupEles[i][j].style.animation="bottomToTop 1s forwards";
        }
    }
    // console.log(individualElesTop);
    // console.table(groupElesTop);
}


