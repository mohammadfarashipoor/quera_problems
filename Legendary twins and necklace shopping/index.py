def check(inp1 , inp2 ):
  if len(inp1)== len(inp2): 
    concatenated = inp1 + inp1
    if inp2 in concatenated:ans.append("YES")
    elif inp2[::-1] in concatenated: ans.append("YES")
    else: ans.append("NO")
 
  else:ans.append("NO")
# the sorted strings are checked
  
## Example 2 for "The strings aren't anagrams."

ans=list()
for _ in range(int(input())):
    x, y = [i for i in input().split()]
    check(x,y)
for i in range(len(ans)):
  print(ans[i])