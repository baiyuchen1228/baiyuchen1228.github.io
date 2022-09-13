##  challenge in exp5
- delete mode
	- 點一下消失
- 電流計
	- 從大電流往回
	- 只讓兩端接線
	- 小圓點
- 電路更新 : check circuit
- meeting note 不用之後把連結拿掉
### more fun challenge
可能要再想想的一些挑戰
### 一些 idea
- 確保學生真的有接電路
    - 讓學生輸入學號姓名(reload 後才能重輸資料)，學生將完成的電路截圖
        - demo : ![](https://github.com/baiyuchen1228/baiyuchen1228.github.io/blob/main/experiment/demo/verify_demo.png)
    - 寫程式把他接的電路元件匯出，學生繳交匯出檔案
        - 電供設定那些也要匯出可能會比較麻煩
        - demo : ![](https://github.com/baiyuchen1228/baiyuchen1228.github.io/blob/main/experiment/demo/ouput_demo.png)
        - 匯出的順序會按照學生接電路的順序，所以可能可以拿來比對，不過小電路之下，重疊率可能會很高
    - 把提示放在 F12 的 console
        - demo : ![https://github.com/baiyuchen1228/baiyuchen1228.github.io/blob/main/experiment/demo/console_demo.png](https://github.com/baiyuchen1228/baiyuchen1228.github.io/blob/main/experiment/demo/console_demo.png)

## 手冊沒寫
- 換電表(電表功能分開)

## challenge in exp6
- Kirchoff 目前只算出 fixed voltage(完全不管電供的最大電流限制)
    - 最大電流/電壓，是指電供的那一個點的最大值
    - fixed current 的 Kirchoff 要寫
    - 雙電供下要算四種組合
- 雙電流下會有一些問題
    - 電流源串聯/並聯
    - 考慮 drop 電流驅動(實驗中只有電壓驅動的，可以在電供變成以電流驅動時提醒使用者就好)
- 電阻燒掉檢查 untest
- powersupply 檢查與 exp5 不同，已修正，但 untest

## new challenge(波形產生器)
- 交流電
- 同軸電纜
- 示波器螢幕 10x8
- V(t) = a sin(wt+b)
- 方波、三角波、sin

## done in exp5
- 按鈕復原
    - (請先點按鈕)please click button first --> 
    1. 請先點選電供、電表的按鈕，在接到麵包版上
    2. 請先取消___，再點選合適按鈕
- rotate breadboard
    - 電路驗證完成
- 增加學生資料
- output == 0 : 輸出 0
- 電流計
	- OVERFLOW 顯示
- 電供:
	- 按住一直跑
	- V : 30V, I = 3A
- 電線 虛線粗一點
- 鱷魚夾的線粗一點(不一樣)
- 全部清除 確認
- 增加undo
- 搞按鈕變小 bug(應該解決了)
- 線移動時加虛線
- 阻止一洞插兩線
- 線兩端加點
- 刪除電容
- 刪除鱷魚夾
- 新增電容
- 三用電表顯示狀態(指針指到誰)
- powersupplyer 顏色新增(output 顏色新增)
- 移動顯示 ohm 值
- inductor 單位改 (mh)
- 線換顏色
- 移動到電阻顯示 ohm 值
- alligator 結束點
- alligator 的 id 會重複
- 點 add allogator 的時候沒有按別的按鈕會導致上一次起點的按鈕繼續被沿用(可能是沒有初始化)
- 不確定 alligator 連接到的點是否會固定位置
- findNodeNum
    - alligator 和 wire 的座標系統不同，已同步
    - 三用電表的 findNodeNum 完成
- check : 電阻、電線、鱷魚夾都已經有放進去判定是否相連了
- findPotential : 檢查 short 結束
- 增加 powersupplyOutputStatus，來判斷有沒有 output
- 新增物件顯現是否有 output，用 powersupplyOutputStatus 去判斷狀態。
- bug: 線只能有個位數個
- bug: alligator 沒有先點按鈕，還是可以畫線，而且會噴掉
- 計算電壓(只考慮一個電阻)
    - 考慮電阻並串聯
    - 怎麼從三用電表去弄
- 三用電表跳到對應的電壓電流才給數字
- 鱷魚夾:
    - 正極 : 紅色
    - 負極 : 藍色 
- meter2 加 on
- output 調整
    - output 開前:
        - 顯示最大電流、最大電壓
    - 綠燈開後： 
        - 用最大電壓算電流
        - 用最大電流算電壓
        - 取小的那一組
- 限制:
    - 電阻功率 1/8 W
- powersupply output 關的時候三用電表值要變 0
- 電流計
	- node 修正

## done in exp6
- 增加undo
- source node 的流入和流出用多一個電流變數解決
- 電壓計目前寫法是給一個很大的電阻，然後用 Kirchoff 算電流，在用電流乘那個很大的數字當電壓(很大的數字 : 10^8)
- bug : 虛擬線不會消失
- bug : 無法輸入姓名等資料