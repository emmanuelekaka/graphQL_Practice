class Stack:
    def __init__(self):
        self.stack = []


    def push(self, dataval):
# Use list append method to add element
        if dataval not in self.stack:
            self.stack.append(dataval)
            return True
        else:
            return False
# Use peek to look at the top of the stack
    def peek(self):     
	    return self.stack[-1]
    def display(self):     
	    return self.stack
    def pop(self):
        self.stack.pop()
        return None

    # def display(self):
    #     print(self.stack)

stack1 = Stack()
stack1.push(1)
stack1.push(2)
stack1.peek()
# stack.display()
stack1.pop()
print(stack1.display())
stack1.push(3)
stack1.push(4)
print(stack1.peek())
print(stack1.display())