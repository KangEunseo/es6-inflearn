class Blog{
    constructor (){
        this.setInitVar();
        this.registerEvents();
        this.likedSet = new Set();
    }

    setInitVar(){
        this.blogList = document.querySelector(".blogList > ul");
    }
    
    registerEvents(){
        const startBtn = document.querySelector(".start");
        const dataURL = "../data/data.json";

        startBtn.addEventListener("click", () => {
            this.setInitData(dataURL);
        });

        this.blogList.addEventListener("click", ({target}) => {
            const targetClassName = target.className;
            const postTitle = target.previousElementSibling.textContent;

            // 찜 취소 클릭한 경우, 찜하기로 다시 변경 후 목록과 뷰에서 제거
            if(targetClassName === "unlike"){
                target.className = "like";
                target.innerHTML = "찜하기";

                this.likedSet.delete(postTitle);
            } else{
                this.likedSet.add(postTitle);   // 찜 목록에 추가

                // 찜한 목록(div)의 e클래스를 like에서 unlike로 변경하기
                target.className = "unlike";
                target.innerHTML = "찜 취소";
            }

            // 내 찜 목록 뷰에 보이게
            this.updateLikedList();
        });
    }

    updateLikedList(){
        const ul = document.querySelector(".like-list > ul");
        let likedSum = "";

        // li 태그에 찜 리스트를 넣고 한 번에 innerHTML을 사용
        this.likedSet.forEach((v) => {
            likedSum += `<li> ${v} </li>`;
        })
        ul.innerHTML = likedSum;
    }

    setInitData(dataURL){
        this.getData(dataURL, this.insertPosts.bind(this));
    }

    getData(dataURL, fn){
        const oReq = new XMLHttpRequest();

        oReq.addEventListener("load", () => {
            const list = JSON.parse(oReq.responseText).body;
            fn(list);
        });

        oReq.open('GET', dataURL);
        oReq.send();
    }

    insertPosts(list){
        list.forEach((v) => {
            this.blogList.innerHTML += `
                <li>
                <a href=${v.link}> ${v.title} </a>
                <div class="like">찜하기</div>
                </li>`;
        })
    }
}

export default Blog;