from queue import Queue

q = Queue()

print("Voy a sacar un elemento...")
q.get()  # Aquí el programa se detiene (espera)
print("¡Listo, lo saqué!")