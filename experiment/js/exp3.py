import numpy as np

ans = np.zeros((14,14,2))

negpoint = [[0,6]]
pospoint = [[13,6]]

for neg in negpoint:
    ans[neg[0]][neg[1]][0] = 0
    ans[neg[0]][neg[1]][1] = 0

for pos in pospoint:
    ans[pos[0]][pos[1]][0] = 0
    ans[pos[0]][pos[1]][1] = 0


for ind in range(10000):
    for i in range(14):
        for j in range(14):
            negtive = False
            for neg in negpoint:
                if(i == neg[0] and j == neg[1]):
                    negtive = True
            if negtive:
                ans[i,j] = 0
                continue
            postive = False
            for pos in pospoint:
                if(i == pos[0] and j == pos[1]):
                    postive = True
            if postive:
                ans[i,j] = 1
                continue
            tmp = 0
            if i == 0:
                if j == 0:
                    tmp += 2 * ans[i + 1][j][ind % 2] + 2 * ans[i][j + 1][ind % 2]
                elif j == 13:
                    tmp += 2 * ans[i + 1][j][ind % 2] + 2 * ans[i][j - 1][ind % 2]
                else:
                    tmp += 2 * ans[i + 1][j][ind % 2] + ans[i][j + 1][ind % 2] + ans[i][j - 1][ind % 2]
            elif i == 13:
                if j == 0:
                    tmp += 2 * ans[i - 1][j][ind % 2] + 2 * ans[i][j + 1][ind % 2]
                elif j == 13:
                    tmp += 2 * ans[i - 1][j][ind % 2] + 2 * ans[i][j - 1][ind % 2]
                else:
                    tmp += 2 * ans[i - 1][j][ind % 2] + ans[i][j + 1][ind % 2] + ans[i][j - 1][ind % 2]
            else:
                if j == 0:
                    tmp += ans[i + 1][j][ind % 2] + ans[i - 1][j][ind % 2] + 2 * ans[i][j + 1][ind % 2]
                elif j == 13:
                    tmp += ans[i + 1][j][ind % 2] + ans[i - 1][j][ind % 2] + 2 * ans[i][j - 1][ind % 2]
                else:
                    tmp += ans[i + 1][j][ind % 2] + ans[i - 1][j][ind % 2]+ ans[i][j + 1][ind % 2] + ans[i][j - 1][ind % 2]
            ans[i][j][(ind + 1) % 2] = tmp / 4
for i in range(14):
    print("[",end='')
    for j in range(14):
        if j == 13:
            print(ans[i][j][0],end="],")
        else:
            print(ans[i][j][0],end=',')
    print()
