##  challenge in exp5
- meter2 加 on
- 限制:
    - 電阻功率 1/8 W

- output 調整
    - output 開前:
        - 顯示最大電流、最大電壓
    - 綠燈開後： 
        - 用最大電壓算電流
        - 用最大電流算電壓
        - 取小的那一組

## 手冊沒寫
- 換電表(電表功能分開)

## done in exp5
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