export default class MALBuilder {
  private xmlObject: string = '';

  constructor(
    private userId: string,
    private userName: string) {

  }

  private getBeginning(): string {
    return `<?xml version="1.0" encoding="UTF-8" ?>
      <myanimelist>

			<myinfo>
				<user_id>${this.userId}</user_id>
				<user_name>${this.userName}</user_name>
				<user_export_type>1</user_export_type>
			</myinfo>`
  }

  private getEnd(): string {
    return `</myanimelist>`;
  }


}