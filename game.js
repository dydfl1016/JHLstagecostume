const totalImages = 45;  // 이미지 총 개수 (1.jpg ~ 45.jpg)
let currentRound = 0;  // 현재 라운드
let selectedImages = [];  // 선택된 이미지들

// 이미지 요소와 버튼 가져오기
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const btnChoose1 = document.getElementById('choose1');
const btnChoose2 = document.getElementById('choose2');
const shareButton = document.getElementById('share');

// 토너먼트 이미지 배열 생성 (처음에는 모든 이미지가 후보)
let images = [];
for (let i = 1; i <= totalImages; i++) {
    images.push(`images/${i}.jpg`);
}

// 초기화 함수: 이미지 업데이트
function updateImages() {
    if (images.length > 1) {
        // 다음 라운드 이미지를 업데이트
        img1.src = images[currentRound];
        img2.src = images[currentRound + 1];
        img1.alt = `이준호 의상 ${currentRound + 1}`;
        img2.alt = `이준호 의상 ${currentRound + 2}`;
    } else {
        showResults();  // 최종 우승자가 남으면 결과 출력
    }
}

// 선택한 이미지를 다음 라운드로 보내는 함수
function chooseImage(choice) {
    const chosenImage = choice === 1 ? img1.src : img2.src;
    selectedImages.push(chosenImage);

    currentRound += 2;

    if (currentRound >= images.length) {
        // 한 라운드가 끝나면 선택된 이미지들로 다음 라운드를 시작
        images = selectedImages;
        selectedImages = [];
        currentRound = 0;
    }

    updateImages();  // 다음 라운드로 이미지 업데이트
}

// 결과를 보여주는 함수 (최종 우승 의상)
function showResults() {
    document.getElementById('game-container').innerHTML = `
        <h2>최종 우승!</h2>
        <img src="${images[0]}" alt="최종 우승 의상">
    `;
    btnChoose1.style.display = 'none';
    btnChoose2.style.display = 'none';
    shareButton.style.display = 'inline-block';  // 공유 버튼 활성화
}

// SNS 공유 기능
shareButton.addEventListener('click', () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`이준호 무대의상 밸런스 게임에서 내가 선택한 최종 우승 의상은 이거야!`);
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(shareUrl, '_blank');
});

// 버튼 클릭 시 선택 처리
btnChoose1.addEventListener('click', () => chooseImage(1));
btnChoose2.addEventListener('click', () => chooseImage(2));

// 초기화
updateImages();

