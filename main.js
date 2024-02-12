//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다.!
//랜덤번호가 < 유저번호 Down!!!
//랜덤번호가 > 유저번호 Up!!
//reset버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//유저가 이미 입력한 숫자를 입력하면, 알려준다, 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click",play); //()함수처럼 말고 매개변수처럼
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){ //한 번 쓸 함수고 단순한 함수면 따로 이름을 만들고 정의 하지 않음
    userInput.value="";
}); //focus = 클릭 한번 했을 때

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1; //랜덤함수는 0~1의 숫자를 알려줌
    console.log("정답",computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent = "1과 100 사이 숫자를 입력해 주세요"
        return; //유효성 검사, 로직의 위에 작성
    }

    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요"
        return; //유효성 검사, 로직의 위에 작성
    }

    chances--;
    chanceArea.textContent = `남은 기회:${chances}번`
    console.log("chance", chances);

    if(userValue < computerNum) {
        resultArea.textContent="Up!!"
    } else if(userValue > computerNum) {
        resultArea.textContent="Down!!"
    }
    else {
        resultArea.textContent="정답입니다!"
        gameOver == true;
    }

    history.push(userValue);
    console.log(history);

    if(chances < 1) {
        gameOver = true; //등호 하나
    }
    if(gameOver == true) {
        playButton.disabled = true;
    }
}

function reset () {
    //유저 인풋창이 정리되고 
    userInput.value = "";
    //새로운 번호 생성
    pickRandomNum()
    resultArea.textContent="결과값이 여기 나옵니다";
    chanceArea.value = 5;
}
pickRandomNum();