
    function calcular() {
      const a = parseFloat(document.getElementById("ladoA").value);
      const b = parseFloat(document.getElementById("ladoB").value);
      const c = parseFloat(document.getElementById("ladoC").value);
      
      if (!a || !b || !c || a + b <= c || a + c <= b || b + c <= a) {
        alert("Ingrese lados válidos que formen un triángulo");
        return;
      }

      const alpha = Math.acos((b*b + c*c - a*a) / (2*b*c)) * (180/Math.PI);
      const beta = Math.acos((a*a + c*c - b*b) / (2*a*c)) * (180/Math.PI);
      const gamma = 180 - alpha - beta;

      const ha = 2 * (Math.sqrt((a + b + c)*(b + c - a)*(a + c - b)*(a + b - c))) / (2*a);
      const hb = 2 * (Math.sqrt((a + b + c)*(b + c - a)*(a + c - b)*(a + b - c))) / (2*b);
      const hc = 2 * (Math.sqrt((a + b + c)*(b + c - a)*(a + c - b)*(a + b - c))) / (2*c);

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s*(s-a)*(s-b)*(s-c));

      const ma = 0.5*Math.sqrt(2*b*b + 2*c*c - a*a);
      const mb = 0.5*Math.sqrt(2*a*a + 2*c*c - b*b);
      const mc = 0.5*Math.sqrt(2*a*a + 2*b*b - c*c);

      const ta = Math.sqrt(b*c*(1 - (a*a)/(b+c)**2));
      const tb = Math.sqrt(a*c*(1 - (b*b)/(a+c)**2));
      const tc = Math.sqrt(a*b*(1 - (c*c)/(a+b)**2));

      document.getElementById("angulos").innerHTML = `<b>Ángulos</b><br> Ángulo α (a): ${alpha.toFixed(2)}°<br> Ángulo β (b): ${beta.toFixed(2)}°<br> Ángulo γ (c): ${gamma.toFixed(2)}°`;
      document.getElementById("medianas").innerHTML = `<b>Medianas</b><br> Mediana ma: ${ma.toFixed(2)}<br> Mediana mb: ${mb.toFixed(2)}<br> Mediana mc: ${mc.toFixed(2)}`;
      document.getElementById("bisectrices").innerHTML = `<b>Bisectrices</b><br> Bisectriz ta: ${ta.toFixed(2)}<br> Bisectriz tb: ${tb.toFixed(2)}<br> Bisectriz tc: ${tc.toFixed(2)}`;
      document.getElementById("alturas").innerHTML = `<b>Alturas</b><br> Altura ha: ${ha.toFixed(2)}<br> Altura hb: ${hb.toFixed(2)}<br> Altura hc: ${hc.toFixed(2)}`;
      document.getElementById("perimetroArea").innerHTML = `<b>Perímetro y Área</b><br> Perímetro: ${(a+b+c).toFixed(2)}<br> Área: ${area.toFixed(2)}`;

    
      const ctx = document.getElementById("canvas").getContext("2d");
      ctx.clearRect(0, 0, 300, 200);
      ctx.beginPath();
      ctx.moveTo(50, 150);
      ctx.lineTo(250, 150);
      ctx.lineTo(150, 150 - hb*20);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "#ecf0f1";
      ctx.fill();
    }
