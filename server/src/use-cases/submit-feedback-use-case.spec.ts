import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

test('sum 2 = 2', () =>{
  expect(2+2).toBe(4)
});

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy},
  { sendMail: sendMailSpy},
/*  { create: async()=>{}},
  { sendMail: async()=>{}},
*/  
);

describe('Submit feedback', () =>{
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
       type: 'BUG',
       comment: 'example comment',
       screenshot: 'data:image/png;base64;adhgfalfhsdhfjklsja'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

  });

  it('should be not able to submit a feedback without type', async () => {

    await expect(submitFeedback.execute({
       type: '',
       comment: 'example comment',
       screenshot: 'data:image/png;base64;adhgfalfhsdhfjklsja'
    })).rejects.toThrow();
  });

  it('should be not able to submit a feedback without comment', async () => {

    await expect(submitFeedback.execute({
       type: 'BUG',
       comment: '',
       screenshot: 'data:image/png;base64;adhgfalfhsdhfjklsja'
    })).rejects.toThrow();
  });  

  it('should be not able to submit a feedback with screenshot format invalid', async () => {

    await expect(submitFeedback.execute({
       type: 'BUG',
       comment: 'ta bugado',
       screenshot: '123'
    })).rejects.toThrow();
  });  

});