from collections import deque, Counter, defaultdict

cola = deque([
    ["Juan", "Menendez", "CC", "1013653911", "Pedro", "General"],
    ["David", "Villarraga", "TI", "1039987155", "Pedro", "General"],
    ["Iyer", "Quiceno", "PP", "1013875944", "Raul", "Odontologica"],
    ["Dabid", "Castro", "CE", "187644188", "Sebastian", "Pediatria"],
    ["Daniel", "Muñoz", "PEP", "43717568", "Felipe", "Especialidad"],
])

option = 99;


while(option != 0):
    print("BIENVENIDO AL SISTEMA DE GESTIÓN DE PQRS")
    print("1. Agendar una cita.")
    print("2. Ver los tipos y los tipos de documento más comunes.")
    print("3. Agrupar por tipo de cita.")
    print("0. Salir.")

    option = int(input())
    if(option == 1):
        nombrePaciente = input("Ingrese el nombre del paciente\n").capitalize
        apellidoPaciente = input("Ingrese el apellido del paciente\n").capitalize
        tipoDocumento = input("Ingrese el tipo de documento\n")
        numeroDocumento = input("Ingrese el numero de documento\n")
        nombreDoctor = input("Ingrese el numero de documento\n")
        tipo = input("Ingrese el tipo (General, Odontologica, Pediatria, Especialidad)").capitalize()

        cola.append([nombrePaciente, apellidoPaciente, tipoDocumento, numeroDocumento, nombreDoctor, tipo])
    if(option == 2):

        documentos = []
        motivos = []

        for registro in cola:
            
            documento = registro[2]
            motivo = registro[5]


            documentos.append(documento)
            motivos.append(motivo)


        conteoDoc = Counter(documentos)
        conteoMot = Counter(motivos)

        print(conteoDoc.most_common(1))
        print(conteoMot.most_common(1))
    if(option == 3):
        especialidad = defaultdict(list)

        for registro in cola:
            tipo = registro[2]
            especialidad[tipo].append(registro)

        # Ejemplo: mostrar todos los agrupados
        for tipo, items in especialidad.items():
            print(f"\n{tipo}:")
            for item in items:
                print(item)

print("Hasta luego :D")