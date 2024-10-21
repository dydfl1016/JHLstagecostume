const totalImages = 45;  // 이미지 총 개수
let currentRound = 1;  // 현재 라운드
let score = { img1: 0, img2: 0 };  // 각 이미지의 선택 횟수

// 이미지 요소와 버튼 가져오기
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const btnChoose1 = document.getElementById('choose1');
const btnChoose2 = document.getElementById('choose2');

// 이미지 업데이트 함수
function updateImages() {
    const img1Index = currentRound * 2 - 1;
    const img2Index = currentRound * 2;

    img1.src = `images/${img1Index}.jpg`;
    img2.src = `images/${img2Index}.jpg`;

    img1.alt = `이준호 의상 ${img1Index}`;
    img2.alt = `이준호 의상 ${img2Index}`;
}

// 버튼 클릭 시 선택 처리
btnChoose1.addEventListener('click', () => {
    score.img1++;
    nextRound();
});

btnChoose2.addEventListener('click', () => {
    score.img2++;
    nextRound();
});

// 다음 라운드로 넘어가는 함수
function nextRound() {
    currentRound++;
    if (currentRound * 2 <= totalImages) {
        updateImages();
    } else {
        showResults();
    }
}

// 결과를 보여주는 함수
function showResults() {
    document.getElementById('game-container').innerHTML = `
        <h2>게임 종료!</h2>
        <p>당신은 총 ${score.img1}번 왼쪽 의상을 선택했고, ${score.img2}번 오른쪽 의상을 선택했습니다!</p>
    `;
    btnChoose1.style.display = 'none';
    btnChoose2.style.display = 'none';
}

// 초기화
updateImages();
