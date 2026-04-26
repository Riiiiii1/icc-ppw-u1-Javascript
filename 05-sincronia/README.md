 #                        v    v      v   v     P   r  x   ác   tica    
zz   x        v  
   x0 
   5     x    x         -                    x           x          Asincronía en JavaSc xr ipxt

## Información del Estudiante
       

- - xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx                  v-  v
   
##    
x 1xxxxx . D   escripción brev e      d e  lx si      m       x      u     l a  v    v xxxxxxxxxxxxxxxx          dor implementado

La práctica implementa  t re sv mó
dxxxxxxxxxxxxxx     ulos     xxxxxx   ind e     p  e        x                      n
 dx           x   ientes que demuestran el  m anejo de operaciones 
 asíncronas en JavaScript. El primero es un simulador de carga de recursos que compara el rendimiento entre peticione
 
 
 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx xs    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx    ejecutadas de    f xxxxxxxxxxx o x     x r  x                ma secuencial y paralela, usando `async/await` y `Promise.all` respectivamente. El segundo es un te
 xm           xpo    x            xri z x            ador re  g resivo construido con `setInte  rvv a  l  x  ` q  u e    ac t
  ualiza x   x   el    xxxxxxxxxxxx   d ix   splay y la barra d  e pr       o   gre s o ca d    a                          v                  seg  u   ndo. El    tercero es         un módulo de manejo de errores que demuestra el uso de `try/catch` y una estr a te g  ia   de reintent     o   s    con backoff exponencial.

---

## 2. Fragmentos de código relevantes

### 2.1 Función que retorna una promesa con setTimeout

Cada petición simulada se construye como una promesa que se resuelve o rechaza después de un tiempo aleatorio. Esto permite simular el comportamiento de llamadas reales a una API.

```javascript
function simularPeticion(nombre, tiempoMin = 500, tiempoMax = 2000, fallar = false) {
  return new Promise((resolve, reject) => {
    const tiempoDelay = Math.floor(Math.random() * (tiempoMax - tiempoMin + 1)) + tiempoMin;

    setTimeout(() => {
      if (fallar) {
        reject(new Error(`Error al cargar ${nombre}`));
      } else {
        resolve({
          nombre,
          tiempo: tiempoDelay,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }, tiempoDelay);
  });
}
```

### 2.2 Carga secuencial con await consecutivos

Las tres peticiones se ejecutan una tras otra. Cada `await` detiene la ejecución hasta que la promesa anterior se resuelve, por lo que el tiempo total es la suma de los tres delays individuales.

```javascript
async function cargarSecuencial() {
    const inicio = performance.now();

    const usuario = await simularPeticion('Usuario', 500, 1000);
    mostrarLog(`✓ ${usuario.nombre} cargado en ${formatearTiempo(usuario.tiempo)}`, 'success');

    const posts = await simularPeticion('Posts', 700, 1500);
    mostrarLog(`✓ ${posts.nombre} cargados en ${formatearTiempo(posts.tiempo)}`, 'success');

    const comentarios = await simularPeticion('Comentarios', 600, 1200);
    mostrarLog(`✓ ${comentarios.nombre} cargados en ${formatearTiempo(comentarios.tiempo)}`, 'success');

    const total = performance.now() - inicio;
    tiempoSecuencial = total;
    mostrarComparativa();
}

zx 
 

 #  2    a  a  ar l l  c n  P  om se.a l
     
 a  t    p om  a    se c  e nx x    mo txe  m
 x  x  y  e esperan juntas con `Promise.all`. El tiempo total equivale al delay más largo de los tres, no a la suma de todos.


x`   v script
async 
x nc ion cargarParalelo() {
    co st inicio = performance.now();


 x   on    r me   a     [  
          i u arP t  iov( Uvua io', 500, 1000),
        simularPeticion('Posts',
        xxxxxxxxxx) zz
        simularPeticion('Comentarios', 600, 1200)
    ];

    const resultadosPromesas = await Promise.all(promesas);

    resultadosPromesas.forEach((resultado) => {
        mostrarLog(`✓ ${resultado.nombre} cargado en ${formatearTiempo(resultado.tiempo)}`, 'success');
    });

    const total = performance.now() - inicio;
    tiempoParalelo = total;
    mostrarComparativa();
}
```

### 2.4 Manejo de errores con try/catch

Se llama a `simularPeticion` con el parámetro `fallar = true` para forzar el rechazo de la promesa. El bloque `catch` captura el error y lo muestra en la interfaz sin interrumpir la ejecución.

```javascript
async function simularError() {
   r      
    aw it si   a   Pvticion  A   I', 500, 1000, true);
    mostrarLogError('✓ Operación e
    xitosa', 'success');
  } 
  xxxxxxxx ror) {
    v s   r og  r r(  `     r r  ap u  do  ${ vr o .me svgv}  v'  rv ' ;             
x   mx      r  gE 
xo  r x ℹ️ E    ro rv  f e  an j a o   c r     c am nte      on tr  /v t  h'   ' n ov) v   v
  }     
}
``
x 
 x 
##   .  T vp viz            etInterval   
v
     temporizador usa ` s t I tx v  xl  vv     c e    a       em              d
     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxt  n    t mát c me  tv  c    c lvavvv e   v  `  xmues
    
    
    xxa  na a          su a io 
   v 
  ` ` av   s  cvi   
in 
xxxxxxxxxx   setInterval(() => {
    tiempoRestante--;
    actualiz   i p  l y )  

  v  if (tiempoRestante <= 0) {
        detener();
        disp a  . lvs Li t.a d( ale     v   
    v
      
      a
      
      xxxx
      t( ⏰ ¡ i vpo tvr  xn  do!' ;
     
v, 10 0)  
 ` 
 
- - 
 
        v v i    v   diferencia 
        xn  xe c r   se uen  vl     xar x ela
 
 a  arva     s cu ncval e ecuta cada  v iv       er n       l  vvvvvio   e  i        lo que el tiempo total es la suma de los tres delays individuales. En cambio, la carga paralela lanza las tres promesas al mismo tiempo y espera a que todas terminen con `Promise.all`, siendo el tiempo total equivalente únicamente al delay más largo de las tres peticiones.





En las pruebas realizadas, la carga secuencial tomó aproximadamente 2.63s mientras que la paralela completó en 1.06s, lo que representa una mejora del 59.8%. Esta diferencia se vuelve más significativa mientras mayor sea el número de peticiones independientes entre sí.

zz-
azz
## 4. Capturas de la Apliczzzzzzzz

### 1. Estructurazzzzzproyecto
![Estructura](./assets/01-estructura.jpeg)

### 2. Carga secuencial
![Carga Secuencial](./assets/02-carga_secuencial.jpeg)

### 3. Carga paralela
![Carga Paralela](./assets/03-carga_paralelo.jpeg)

### 4. Comparativa de tiempos
![Comparativa](./assets/04-comparativa.jpeg)

### 5. Temporizador funcionando
![Temporizador](./assets/05-temporizador.jpeg)

### 6. Mznejo de errores
![Errores

](./azzets/06-errores.jpeg)

#z
}zzzzzonsola limpia

![Consola](./assets/07-consola_limpia.jpeg)


### 8. Funciones async/await y Promise.all
![Fx c  n         /assets/08-funciones_promise.jpeg)
zz






zzxx                
xx            
xxxxxxxx  x  
xxxxxxxxxxxxxxxxxxxxxxxxxxx            v               
x           
x                        x                   
 


