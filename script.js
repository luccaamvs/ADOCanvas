// Primeira coisa a fazer é pegar o Canvas e o configurar com a função load.
// A arrow function vai definir tudo que será carregado junto com o canvas.

window.addEventListener("load", () => {
    //Configurações de Cena e imagem.
    const   canvas      = document.querySelector('#meuCanvas');
    let     ctx         = canvas.getContext('2d');
    let     imagem      = document.createElement('img');

    var mouseAtivo = false;

    imagem.src     =  'imagem.png';

    imagem.onload = function(){
        ctx.drawImage(imagem, 50, 100, 500, 500);
        //Define mouse desativado por padrão.

        //Mouse Ativo.
        canvas.onmousedown = function(e){
            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
            mouseAtivo = true;
        }

        //Mouse Desativo.
        canvas.onmouseup = function(e){
            mouseAtivo = false;
        }

        //Mouse em movimento.
        canvas.onmousemove  = function(e){
            if (!mouseAtivo) return
                
            //Define cor do nosso lápis.
            ctx.strokeStyle = "white";
            ctx.lineWidth   = 10;
            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();
            
        }
    }


    //NOVA FUNCIONALIDADE --------------------------------------------------------- 
    //Enviar 

    let arquivos = document.querySelector('input');

    //Verificando se arquivos são válidos.
    arquivos.onchange = function(e){
        let arquivos  = e.target;
        let leitor   = new FileReader();
        leitor.onload = function(){
            const resultado = leitor.result;
            imagem.src = resultado;
        }
            leitor.readAsDataURL(arquivos.files[0]);
    };



    //NOVA FUNCIONALIDADE --------------------------------------------------------- 
    //Baixar Imagem.

    // Necessario pegar a imagem EDITADA.

    //
    let botao = document.querySelector('a');

    botao.onclick = function(){
  
        const imagemLink    = document.createElement('a');

        imagemLink.href     = canvas.toDataURL();
        imagemLink.download = 'imagem';

        document.body.appendChild(imagemLink);
        imagemLink.click();
        document.body.removeChild(imagemLink);
    }

    //NOVA FUNCIONALIDADE --------------------------------------------------------- 
    //Tirar fotos Webcam
        
    const pegarWebcam   = document.getElementById('minhaWebcam');
    const pegarFoto     = document.getElementById('foto');

    const webcam = new Webcam(pegarWebcam, 'user', canvas);

    //Acessar Webcam.
    webcam.start().then(result =>{
        alert('Webcam iniciada');
    }).catch(error => {
        alert('Erro');
    });

    //Faz o botão tirar a foto e substituir a imagem atual.
    pegarFoto.onclick = function(){ 
        let fotoFinal   = webcam.snap();
        imagem.href     = fotoFinal;
    }  

    //Final do Load --------------------------------------------------------- 
    });