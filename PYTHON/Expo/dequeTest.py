from collections import deque

dq = deque([10, 20, 30])

# Añade elementos en el final
dq.append(40) # [10, 20, 30, 40]

# Añade elementos al principio -> Esto no se puede en una cola normal
dq.appendleft(5) # [5, 10, 20, 30, 40]

# Le añade cada uno a la izquierda
dq.extendleft([0, 5]) # [5, 0, 5, 10, 20, 30, 40]

# remove method -> Queue no lo permite
dq.remove(20) # [5, 0, 5, 10, 30, 40]

# Elimina el último elemento
dq.pop() # [5, 0, 5, 10, 30]

# Elimina el primer elemento -> Queue no lo permite
dq.popleft() # [0, 5, 10, 30]

# Elimina toda la cola -> Queue no lo permite
dq.clear()  # []