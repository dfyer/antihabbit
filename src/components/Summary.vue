<template>
  <div class="summary">
    <h3>Alcohol Summary</h3>
    <!--
    <div>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      <button v-on:click="submitFile()">Submit</button>
    </div>
    -->

    <div id="summary-bar">
      <div class="week" v-for="week in weeks">
        <div class="header">
          {{getMonthForStartingWeek(week)}}
        </div>
        <div v-for="day in week"
          :class="{day: true,
            'val-high': day[1]=='high',
            'val-mid': day[1]=='mid',
            'val-low': day[1]=='low',
            'val-none': day[1]=='none',
            'today': isToday(day[0]),
            }">
        </div>
      </div>
    </div>



    <h3>To Do</h3>
    <div>
      구글드라이브 바로 참조
    </div>

    <div id="control" v-if="enable_control">
      <sketch-picker v-model="mid"></sketch-picker>
    </div>
  </div>
</template>

<script>
import { Sketch } from 'vue-color'
import { VueCsvImport } from 'vue-csv-import';
import VuePapaParse from 'vue-papa-parse'

export default {
  components: {
    'sketch-picker': Sketch,
    'vue-csv-import': VueCsvImport,
  },
  props: [
    'dates', 'totals'
  ],
  data () {
    return {
      // CSV
      file: '',

      // Color Control
      enable_control: false,
      colors: {
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      },
      bgc: { hex: '#2D373E', },
      high: { hex: '#194d33', },
      mid: { hex: '#13955A', },
      low: { hex: '#1B543A', },
      none: { hex: '#222D28', },
      csv: '',
      weeks: [],
    }
  },
  methods: {
    handleFileUpload() {
      /* deprecated
      this.file = this.$refs.file.files[0];
      */
    },
    submitFile() {
      /* deprecated
      let self = this;
      this.$papa.parse(this.file, {
      	complete: function(results) {
      		self.csv = results.data.slice(5);
          self.loadSummaryBar();
      	}
      });
      */
    },
    loadSummaryBar() {
      this.weeks = []

      let raw_weeks = []
      for (let i = 0; i < (new Date(this.dates[0])).getDay(); i++) {
        raw_weeks.push(["", "blank"]);
      }
      for (let i = 0; i < this.dates.length; i++) {
        let total_criteria = "";
        if (this.totals[i] == 0) {
          total_criteria = "none";
        } else if (this.totals[i] <= 1) {
          total_criteria = "low";
        } else if (this.totals[i] <= 2) {
          total_criteria = "mid";
        } else {
          total_criteria = "high";
        }
        raw_weeks.push([this.dates[i], total_criteria]);
      }
      while(raw_weeks.length) this.weeks.push(raw_weeks.splice(0,7));

      console.log(this.weeks);
    },
    isToday(dateStr) {
      const today = new Date()
      let target = new Date(dateStr)
      return target.getDate() == today.getDate() &&
        target.getMonth() == today.getMonth() &&
        target.getFullYear() == today.getFullYear()
    },
    getMonthForStartingWeek(week) {
      let ret_val = ""
      week.forEach(day => {
        let daydate = new Date(day[0])
        if (daydate != 'Invalid Date' && daydate.getDate() == 1) {
          if (daydate.getMonth() == 0)       { ret_val = "Jan"; return }
          else if (daydate.getMonth() == 1)  { ret_val = "Feb" }
          else if (daydate.getMonth() == 2)  { ret_val = "Mar" }
          else if (daydate.getMonth() == 3)  { ret_val = "Apr" }
          else if (daydate.getMonth() == 4)  { ret_val = "May" }
          else if (daydate.getMonth() == 5)  { ret_val = "Jun" }
          else if (daydate.getMonth() == 6)  { ret_val = "Jul" }
          else if (daydate.getMonth() == 7)  { ret_val = "Aug" }
          else if (daydate.getMonth() == 8)  { ret_val = "Sep" }
          else if (daydate.getMonth() == 9)  { ret_val = "Oct" }
          else if (daydate.getMonth() == 10)  { ret_val = "Nov" }
          else if (daydate.getMonth() == 11)  { ret_val = "Dec" }
        }
      })
      return ret_val
    }
  },
  watch: {
    totals: function (val) {
      this.loadSummaryBar()
    }
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
#summary-bar {
  margin: 40px 0 0;
  display: inline-block;
  width: 1166px;
  height: 174px;
  background: #2D373E;
  border: 1px solid #183152;
  text-align: left;
  padding: 10px 10px;
}
#summary-bar .week {
  display: inline-block;
  height: 174px;
  margin-left: 2px;
}
#summary-bar .week .header{
  color: #ebfff6;
  width: 20px;
  text-align:center;
  overflow: hidden;
  font-size: 11px;
  font-weight: bold;
}
#summary-bar .week .day {
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0);
  margin: 2px 0 0;
}
#summary-bar .day.val-high {
  background: #00FF8B;
  border: 1px solid #00FF8B;
}
#summary-bar .day.val-mid {
  background: #13955A;
  border: 1px solid #13955A;
}
#summary-bar .day.val-low {
  background: #1B543A;
  border: 1px solid #1B543A;
}
#summary-bar .day.val-none {
  background: #222D28;
  border: 1px solid #222D28;
}
#summary-bar .day.blank {
}
#summary-bar .day.today {
  border: 1px solid #fff;
}

/*
Primary Color:

#00AB6F	#20805E	#006F48	#35D59D	#60D5AC
Secondary Color A:

#06799F	#216278	#024E68	#3AAACF	#61B4CF
Secondary Color B:

#0ACF00	#2D9B27	#078600	#42E73A	#6EE768
*/
</style>
