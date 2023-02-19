import numpy as np

ans = np.zeros((13,13,2))

negpoint = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12]]
pospoint = [[12,0],[12,1],[12,2],[12,3],[12,4],[12,5],[12,6],[12,7],[12,8],[12,9],[12,10],[12,11],[12,12]]

for neg in negpoint:
    ans[neg[0]][neg[1]][0] = 0
    ans[neg[0]][neg[1]][1] = 0

for pos in pospoint:
    ans[pos[0]][pos[1]][0] = 0
    ans[pos[0]][pos[1]][1] = 0


for ind in range(10000):
    for i in range(13):
        for j in range(13):
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
                elif j == 12:
                    tmp += 2 * ans[i + 1][j][ind % 2] + 2 * ans[i][j - 1][ind % 2]
                else:
                    tmp += 2 * ans[i + 1][j][ind % 2] + ans[i][j + 1][ind % 2] + ans[i][j - 1][ind % 2]
            elif i == 12:
                if j == 0:
                    tmp += 2 * ans[i - 1][j][ind % 2] + 2 * ans[i][j + 1][ind % 2]
                elif j == 12:
                    tmp += 2 * ans[i - 1][j][ind % 2] + 2 * ans[i][j - 1][ind % 2]
                else:
                    tmp += 2 * ans[i - 1][j][ind % 2] + ans[i][j + 1][ind % 2] + ans[i][j - 1][ind % 2]
            else:
                if j == 0:
                    tmp += ans[i + 1][j][ind % 2] + ans[i - 1][j][ind % 2] + 2 * ans[i][j + 1][ind % 2]
                elif j == 12:
                    tmp += ans[i + 1][j][ind % 2] + ans[i - 1][j][ind % 2] + 2 * ans[i][j - 1][ind % 2]
                else:
                    tmp += ans[i + 1][j][ind % 2] + ans[i - 1][j][ind % 2]+ ans[i][j + 1][ind % 2] + ans[i][j - 1][ind % 2]
            ans[i][j][(ind + 1) % 2] = tmp / 4
for i in range(13):
    print("[",end='')
    for j in range(13):
        if j == 12:
            print(ans[i][j][0],end="],")
        else:
            print(ans[i][j][0],end=',')
    print()
        