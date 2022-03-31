"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _IMailTemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailTemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('MailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailTemplateProvider.default === "undefined" ? Object : _IMailTemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_temp = class EtherealMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'deondre.larkin82@ethereal.email',
          pass: 'Bd5tjCZbMQ3bVC9VmT'
        }
      });

      this.client = transporter;
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe Samurai',
        address: from?.email || 'equipe@samurai.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
    /* eslint-disable no-console */

    console.log(`Message sent: ${message.messageId}`);
    console.log(`Preview URL: ${_nodemailer.default.getTestMessageUrl(message)}`);
  }

}, _temp)) || _class) || _class) || _class) || _class);
exports.default = EtherealMailProvider;