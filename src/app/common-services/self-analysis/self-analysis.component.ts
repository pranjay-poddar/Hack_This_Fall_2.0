import { Component, OnInit } from '@angular/core';
import { Option, Question, Quiz, QuizConfig } from '../../models/index';
import { HelperService } from 'src/app/services/helper.service';
import { flyInOut , expand} from '../../Utilities/animations/animation';
import { QuizService } from 'src/app/services/quiz.service';
import { SharingService } from 'src/app/services/sharing.service';
let positive = 0;
let answers:any = [];

@Component({
  selector: 'app-self-analysis',
  templateUrl: './self-analysis.component.html',
  styleUrls: ['./self-analysis.component.scss'],
  providers: [QuizService],
    animations: [
      flyInOut(),
      expand()
    ]
})

export class SelfAnalysisComponent implements OnInit {
  hidecomponent = "cat";
  analysisResultPositive:string='';
  analysisResultNegative:string='';
  heightfix="heightfix";
  marginHide = "heading-1";
  quizes !: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName !: string;
  light ! : string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'duration': 600,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': true,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': true,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime !: Date;
  endTime !: Date;
  ellapsedTime = '00:00';
  duration = '';
  constructor(private quizService: QuizService, private sharingService:SharingService) { }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
    if(this.quizes[0]){
    
    }
    this.light = this.sharingService.getData();
  }
  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.pager.index=0;
    
      this.startTime = new Date();
      this.ellapsedTime = '00:00';
      this.timer = setInterval(() => { this.tick(); }, 1000);
      this.duration = this.parseTime(this.config.duration);
    });
    this.mode = 'quiz';
  }

  tick() {
    const now = new Date();
    const diff = (now.getTime() - this.startTime.getTime()) / 1000;
    if (diff >= this.config.duration) {
      this.onSubmit();
    }
    this.ellapsedTime = this.parseTime(diff);
  }

  parseTime(totalSeconds: number) {
    let mins: string | number = Math.floor(totalSeconds / 60);
    let secs: string | number = Math.round(totalSeconds % 60);
    mins = (mins < 10 ? '0' : '') + mins;
    secs = (secs < 10 ? '0' : '') + secs;
    return `${mins}:${secs}`;
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: any, option: any) {
    if (question.QuestionTypeId == 1) {
      question.Options.forEach((x:any) => { if (x.Id != option.Id) x.Selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {

    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
    
  };
  
  

  onPositive(){
    // console.log(positive);
    if(positive >= 6){
      return 1;
    }
    else{
      return 0;
    }
  }

}
