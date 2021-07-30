const addedTodo = () => {
    //テキストボックスの値を取得し、初期化する
    const inputText = document.querySelector("#add-text").value;
    document.querySelector("#add-text").value = "";

    moveToIncompleteList(inputText);
};

document
    .querySelector("#add-button")
    .addEventListener("click", addedTodo);

//リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target,list) =>{
    document.querySelector(list).removeChild(target);
};

//未完了リストに追加する関数
const moveToIncompleteList = (text) => {
    //liタグ生成
    const li = document.createElement("li");
    
    //div(list-low)タグ生成
    const div1 = document.createElement("div");
    div1.className = "list-low";

    //pタグ生成
    const p = document.createElement("p");
    p.innerText = text;

    //divタグ生成
    const div2 = document.createElement("div");
    
    //buttonタグ生成
    const completeButton = document.createElement("button");
    completeButton.innerText = "完了";
    completeButton.addEventListener("click",()=>{
        //押された完了ボタンの親タグ(li)を未完了リストから削除
        deleteFromIncompleteList(completeButton.parentNode.parentNode.parentNode,"#incomplete-list");
        
        //完了リストに追加する要素
        const moveTarget = completeButton.parentNode.parentNode.parentNode;
        
        //TODO内容テキストを取得
        const textToMove = moveTarget.querySelector("p").innerText;
        
        //div以下を初期化
        moveTarget.querySelector(".list-low").textContent = null;
        
        //pタグ生成
        const p2 = document.createElement("p");
        p2.innerText = textToMove;

        //buttonタグ生成
        const backButton = document.createElement("button");
        backButton.innerText = "戻す";
        backButton.addEventListener("click",()=>{
            //押された完了ボタンの親タグ(li)を完了リストから削除
            deleteFromIncompleteList(backButton.parentNode.parentNode,"#complete-list");
            
            //完了リストに追加する要素
            const backTarget = backButton.parentNode.parentNode;
        
            //TODO内容テキストを取得
            const textToBack = backTarget.querySelector("p").innerText;
            moveToIncompleteList(textToBack);
        });

        //liタグ,divタグの子要素を設定
        moveTarget.querySelector(".list-low").appendChild(p2);
        moveTarget.querySelector(".list-low").appendChild(backButton);

        //未完了のリストに追加
        document.querySelector("#complete-list").appendChild(moveTarget);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "削除";
    deleteButton.addEventListener("click",()=>{
        //押された削除ボタンの親タグ(li)を未完了リストから削除
        deleteFromIncompleteList(deleteButton.parentNode.parentNode.parentNode,"#incomplete-list");
    });
    //divタグにbuttonタグを子要素として設定
    div2.appendChild(completeButton);
    div2.appendChild(deleteButton);

    //liタグ,divタグの子要素を設定
    li.appendChild(div1);
    div1.appendChild(p);
    div1.appendChild(div2)

    //未完了のリストに追加
    document.querySelector("#incomplete-list").appendChild(li);
};