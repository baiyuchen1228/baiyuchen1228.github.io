##  challenge in exp5
- 線移動時加虛線
- 線兩端加點
- 阻止一洞插兩線
- 刪除電容 鱷魚夾
- 計算電壓
    - 考慮電阻並串聯
    - 怎麼從三用電表去弄
- <font color="#00f">新增物件顯現是否有 output </font>，用 powersupplyOutputStatus 去判斷狀態。
- <font color="#f00">bug</font>: add wire 從外往內畫線也會噴error

## done
- 新增電容
- 三用電表顯示狀態(指針指到誰)
- powersupplyer 顏色新增(output 顏色新增)
- 移動顯示ohm值
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

- <font color="#f00">bug</font>: alligator 沒有先點按鈕，還是可以畫線，而且會噴掉