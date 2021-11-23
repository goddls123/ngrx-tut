import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService, ToastService, User } from "ng2-arv-lib";
import { Notice } from "src/app/model/vision";
import { MyApiService } from "src/app/service/my-api.service";

@Component({
  selector: "user-notice-edit",
  templateUrl: "./notice-edit.component.html",
  styleUrls: ["./notice-edit.component.css"],
})
export class NoticeEditComponent implements OnInit {
  @Input() mainPage: string;
  @Input() notice: Notice;

  description: any;
  title: string;
  @ViewChild("editor") ckeditor: any;

  public editorReady: boolean;

  public currentUser: User = this.authService.getCurrentUser();

  constructor(
    private authService: AuthService,
    private apiService: MyApiService,
    private toastService: ToastService,
    private translate: TranslateService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.notice) {
      this.title = this.notice.subject;
      this.description = this.notice.contents;
    }
  }

  movePage(page: string) {
    this.router.navigate([`notice/${this.mainPage}/${page}`]);
  }

  async setNewNotice() {
    this.notice.subject = this.title;
    this.notice.contents = this.description;
    let resp: any;

    if (this.mainPage === "event") {
      resp = await this.apiService.setEvent(this.notice);
    } else if (this.mainPage === "billiai-info") {
      resp = await this.apiService.setBilliaiInfo(this.notice);
    } else if (this.mainPage === "billiard-info") {
      resp = await this.apiService.setBilliardInfo(this.notice);
    }

    if (resp.status) {
      this.movePage("list");
      this.toastService.add("info", this.translate.instant("notice.text.save"));
    } else {
      this.toastService.add(
        "error",
        this.translate.instant("notice.text.save-error")
      );
    }
  }

  cancelEdit() {
    this.movePage("list");
  }
}
