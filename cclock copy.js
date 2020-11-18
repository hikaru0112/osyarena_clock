const month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const week_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);
dayjs().format();
//localeは表示言語
document.addEventListener('DOMContentLoaded', () => {
   const result = document.getElementsByClassName('clock');
   console.log(result[0]);
   console.log(result[1]);
   for(i = 0;i<result.length;i++){
      const aclock = new AnalogClock(result[i].getAttribute('locate'));
      aclock.setup(result[i], result[i].getAttribute('c_width'), result[i].getAttribute('c_hi')).start();
   }
   
});


class Clock {
   startdeg = 0;
   deg60 = 6;
   deg12 = 30;
   degms = 0.006;
   lodate = null;

   constructor(str) {
      this.tz = str;

   }
   settime() {

      this.lodate = dayjs.tz(dayjs(), this.tz);
      this.a = this.lodate.day()
      this.day = this.lodate.date();
      this.mon = this.lodate.month();
      this.yar = this.lodate.year();
      this.msec = this.lodate.millisecond();
      this.sec = this.lodate.second();
      this.min = this.lodate.minute();
      this.hor = this.lodate.hour();
   }

}

class AnalogClock extends Clock {
   el = null;
   s_cycle = null;
   m_cycle = null;
   h_cycle = null;
   s_befor = null;
   s_after = null;
   s_inner = null;
   m_befor = null;
   m_after = null;
   m_inner = null;
   h_befor = null;
   h_after = null;
   h_inner = null;
   h_inner_day = null;
   h_inner_time = null;

   setdeg() {
      super.settime();
      this.sdeg = ((this.startdeg + (this.sec * this.deg60)) + (this.degms * this.msec));
      this.mdeg = ((this.startdeg + (this.min * this.deg60)) + (0.1 * this.sec));
      if (this.hor >= 12) {
         this.hdeg = ((this.startdeg + ((this.hor - 12) * this.deg12)) + (0.5 * this.min));
      } else {
         this.hdeg = ((this.startdeg + ((this.hor) * this.deg12)) + (0.5 * this.min));
      }
   }

   setup(el, widh, hi) {
      if (widh == null) {} else {
         el.style.width = widh + 'px';
         el.style.height = hi + 'px';
      }

      this.s_cycle = el.appendChild(document.createElement('div'));
      this.m_cycle = el.appendChild(document.createElement('div'));
      this.h_cycle = el.appendChild(document.createElement('div'));
      this.s_befor = this.s_cycle.appendChild(document.createElement('div'));
      this.s_after = this.s_cycle.appendChild(document.createElement('div'));
      this.s_inner = this.s_cycle.appendChild(document.createElement('div'));
      this.m_befor = this.m_cycle.appendChild(document.createElement('div'));
      this.m_after = this.m_cycle.appendChild(document.createElement('div'));
      this.m_inner = this.m_cycle.appendChild(document.createElement('div'));
      this.h_befor = this.h_cycle.appendChild(document.createElement('div'));
      this.h_after = this.h_cycle.appendChild(document.createElement('div'));
      this.h_inner = this.h_cycle.appendChild(document.createElement('div'));
      this.h_inner_day = this.h_inner.appendChild(document.createElement('p'));
      this.h_inner_time = this.h_inner.appendChild(document.createElement('p'));

      this.s_cycle.style.width = '100%';
      this.s_cycle.style.height = '100%';
      this.s_cycle.style.background = '#1de8ff';
      this.s_cycle.style.position = 'absolute';
      this.s_cycle.style.transformOrigin = 'center top';
      this.s_cycle.style.overflow = 'hidden';
      this.s_cycle.style.borderRadius = '50% '
      this.s_cycle.style.textAlign = 'center';
      this.s_cycle.style.marginLeft = '-50%';
      this.s_cycle.style.marginTop = '-50%';
      this.s_cycle.style.zIndex = '1';

      this.m_cycle.style.width = '87%';
      this.m_cycle.style.height = '87%';
      this.m_cycle.style.background = '#3dfa0d';
      this.m_cycle.style.position = 'absolute';
      this.m_cycle.style.transformOrigin = 'center top';
      this.m_cycle.style.overflow = 'hidden';
      this.m_cycle.style.borderRadius = '50% '
      this.m_cycle.style.textAlign = 'center';
      this.m_cycle.style.marginLeft = '-43.5%';
      this.m_cycle.style.marginTop = '-43.5%';
      this.m_cycle.style.zIndex = '6';

      this.h_cycle.style.width = '74%';
      this.h_cycle.style.height = '74%';
      this.h_cycle.style.background = '#f76868';
      this.h_cycle.style.position = 'absolute';
      this.h_cycle.style.transformOrigin = 'center top';
      this.h_cycle.style.overflow = 'hidden';
      this.h_cycle.style.borderRadius = '50% '
      this.h_cycle.style.textAlign = 'center';
      this.h_cycle.style.marginLeft = '-37%';
      this.h_cycle.style.marginTop = '-37%';
      this.h_cycle.style.zIndex = '9';

      this.s_after.style.display = 'block';
      this.s_after.style.position = 'absolute';
      this.s_after.style.left = '-50%';
      this.s_after.style.width = '100%';
      this.s_after.style.height = '106%';
      this.s_after.style.background = '#000';
      this.s_after.style.transformOrigin = 'right 50%';
      this.s_after.style.zIndex = '2';

      this.s_befor.style.display = 'block';
      this.s_befor.style.position = 'absolute';
      this.s_befor.style.left = '50%';
      this.s_befor.style.width = '100%';
      this.s_befor.style.height = '106%';
      this.s_befor.style.background = '#000';
      this.s_befor.style.transformOrigin = 'left 50%';
      this.s_befor.style.zIndex = '3';

      this.s_inner.style.position = 'absolute';
      this.s_inner.style.top = '2.16%';
      this.s_inner.style.left = '2.16%';
      this.s_inner.style.width = '92.5%';
      this.s_inner.style.height = '92.5%';
      this.s_inner.style.marginTop = '1.15%';
      this.s_inner.style.marginLeft = '1.15%'
      this.s_inner.style.background = '#000';
      this.s_inner.style.borderRadius = '50%';
      this.s_inner.style.zIndex = '4';

      this.m_after.style.display = 'block';
      this.m_after.style.position = 'absolute';
      this.m_after.style.left = '-50%';
      this.m_after.style.width = '100%';
      this.m_after.style.height = '106%';
      this.m_after.style.background = '#000';
      this.m_after.style.transformOrigin = 'right 50%';
      this.m_after.style.zIndex = '6';

      this.m_befor.style.display = 'block';
      this.m_befor.style.position = 'absolute';
      this.m_befor.style.left = '50%';
      this.m_befor.style.width = '100%';
      this.m_befor.style.height = '106%';
      this.m_befor.style.background = '#000';
      this.m_befor.style.transformOrigin = 'left 50%';
      this.m_befor.style.zIndex = '7';

      this.m_inner.style.position = 'absolute';
      this.m_inner.style.top = '2.16%';
      this.m_inner.style.left = '2.16%';
      this.m_inner.style.width = '92.5%';
      this.m_inner.style.height = '92.5%';
      this.m_inner.style.marginTop = '1.5%';
      this.m_inner.style.marginLeft = '1.5%'
      this.m_inner.style.background = '#000';
      this.m_inner.style.borderRadius = '50%';
      this.m_inner.style.zIndex = '8';

      this.h_after.style.display = 'block';
      this.h_after.style.position = 'absolute';
      this.h_after.style.left = '-50%';
      this.h_after.style.width = '100%';
      this.h_after.style.height = '106%';
      this.h_after.style.background = '#000';
      this.h_after.style.transformOrigin = 'right 50%';
      this.h_after.style.zIndex = '10';

      this.h_befor.style.display = 'block';
      this.h_befor.style.position = 'absolute';
      this.h_befor.style.left = '50%';
      this.h_befor.style.width = '100%';
      this.h_befor.style.height = '106%';
      this.h_befor.style.background = '#000';
      this.h_befor.style.transformOrigin = 'left 50%';
      this.h_befor.style.zIndex = '11';

      this.h_inner.style.position = 'absolute';
      this.h_inner.style.top = '2.16%';
      this.h_inner.style.left = '2.16%';
      this.h_inner.style.width = '92.5%';
      this.h_inner.style.height = '92.5%';
      this.h_inner.style.marginTop = '1.5%';
      this.h_inner.style.marginLeft = '1.5%'
      this.h_inner.style.background = '#000';
      this.h_inner.style.borderRadius = '50%';
      this.h_inner.style.textAlign = 'center';
      this.h_inner.style.color = 'white';
      this.h_inner.style.zIndex = '12';

      this.h_inner_day.style.fontSize = '12px';
      this.h_inner_day.style.marginTop = '30px';
      this.h_inner_day.style.fontFamily = "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";

      this.h_inner_time.style.marginTop = '2px';
      this.h_inner_time.style.fontSize = '35px';
      this.h_inner_time.style.fontFamily = "'Courier New', Courier, monospace";

      return this;
   }

   start() {
      this.setdeg();
      const start = Date.now();
      let s_s = this.sdeg / 800;
      let s_m = this.mdeg / 800;
      let s_h = this.hdeg / 800;
      let s_sb = 0;
      let s_mb = 0;
      let s_hb = 0;

      const startAnimation = (() => {

         let timePassed = Date.now() - start;
         if (timePassed >= 800) {
            clearInterval(startAnimation);
            setInterval(setaclock, 20);
         }
         this.draw(s_sb, s_mb, s_hb);
         s_sb += s_s * 20;
         s_mb += s_m * 20;
         s_hb += s_h * 20;
      });

      const setaclock = (() => {
         this.setdeg();
         this.draw(this.sdeg, this.mdeg, this.hdeg);
      });

      setInterval(startAnimation, 100);

   }

   draw(s, m, h) {
      const b_sec = this.s_befor;
      const a_sec = this.s_after;
      const b_min = this.m_befor;
      const a_min = this.m_after;
      const b_hor = this.h_befor;
      const a_hor = this.h_after;

      const desp_time = this.h_inner_day;
      const desp_time_2 = this.h_inner_time;
      if (s > 180) {
         b_sec.style.transform = `rotate(${0}deg)`;
         b_sec.style.backgroundColor = '#1DE8FF'
         a_sec.style.transform = `rotate(${s-180}deg)`;
      } else {
         a_sec.style.transform = `rotate(${0}deg)`;
         a_sec.style.backgroundColor = '#000'
         b_sec.style.backgroundColor = '#000'
         b_sec.style.transform = `rotate(${s}deg)`;
      }
      if (m > 180) {

         b_min.style.transform = `rotate(${0}deg)`;
         b_min.style.backgroundColor = '#3dfa0d'
         a_min.style.transform = `rotate(${m-180}deg)`;
      } else {
         a_min.style.transform = `rotate(${0}deg)`;
         a_min.style.backgroundColor = '#000'
         b_min.style.backgroundColor = '#000'
         b_min.style.transform = `rotate(${m}deg)`;
      }
      if (h > 180) {

         b_hor.style.transform = `rotate(${0}deg)`;
         b_hor.style.backgroundColor = '#f76868'
         a_hor.style.transform = `rotate(${h-180}deg)`;
      } else {
         a_hor.style.transform = `rotate(${0}deg)`;
         a_hor.style.backgroundColor = '#000'
         b_hor.style.backgroundColor = '#000'
         b_hor.style.transform = `rotate(${h}deg)`;
      }


      desp_time.innerHTML = this.getdegitday();
      desp_time_2.innerHTML = this.getdegittime();
   }
   getdegitday() {
      this.settime();
      return `${week_list[this.a]} ${this.day} ${month_list[this.mon]}`;
   }
   getdegittime() {
      this.settime();
      if (this.sec % 2 == 0) {
         return `${('0' + this.hor).slice(-2)}:${('0' + this.min).slice(-2)}`;
      } else {
         return `${('0' + this.hor).slice(-2)} ${('0' + this.min).slice(-2)}`;
      }
   }

}