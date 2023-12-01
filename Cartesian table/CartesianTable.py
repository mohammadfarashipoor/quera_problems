def drawTable(x,y) :
    vertical = '';
    horizontal = '|';
    for i in range(x):
        for j in range(y):
            vertical = vertical + ' _'
            horizontal = horizontal + ' |'
        print(vertical)
        print(horizontal)
        if(i==x-1):
            print(vertical)
        vertical = '';
        horizontal = '|'

x, y = [int(i) for i in input().split()]

drawTable(x,y)