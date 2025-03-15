import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../service/AIModal';

const PROMPT = 'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume, give me result in HTML format';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [editorValue, setEditorValue] = useState(defaultValue);  
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    setLoading(true);

    // Safeguard: Check if resumeInfo.Experience exists and has the required title
    if (!resumeInfo?.Experience || !resumeInfo.Experience[index]?.title) {
      toast('Please Add Position Title');
      setLoading(false);
      return;
    }

    const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);
    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());

    let resp;
    try {
      // Safeguard: Parse the AI response and handle JSON parsing errors
      resp = JSON.parse(result.response.text());
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      toast('Failed to parse AI response.');
      setLoading(false);
      return;
    }

    // Safeguard: Check if resp is an array and has at least one element
    if (!Array.isArray(resp) || resp.length === 0) {
      console.error('AI response is not in the expected format:', resp);
      toast('AI response is not in the expected format.');
      setLoading(false);
      return;
    }

    const firstItem = resp[0];

    // Safeguard: Check if firstItem has the required properties
    if (!firstItem || (!firstItem.experience_bullets && !firstItem.experienceBulletPoints)) {
      console.error('AI response does not contain valid bullet points:', firstItem);
      toast('AI response does not contain valid bullet points.');
      setLoading(false);
      return;
    }

    const bullets = firstItem.experience_bullets || firstItem.experienceBulletPoints || [];

    // Safeguard: Check if bullets is an array and has at least one element
    if (!Array.isArray(bullets) || bullets.length === 0) {
      console.error('AI response does not contain valid bullet points:', bullets);
      toast('AI response does not contain valid bullet points.');
      setLoading(false);
      return;
    }

    // Convert the array of bullet points into an HTML string
    const htmlString = `
      <ul>
        ${bullets.map((bullet) => `<li>${bullet}</li>`).join('')}
      </ul>
    `;

    // Update the editor value and notify the parent component
    setEditorValue(htmlString);
    onRichTextEditorChange({ target: { value: htmlString } }, 'workSummery', index);

    setLoading(false);
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-s'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? <LoaderCircle className='animate-spin' /> : <><Brain className='h-4 w-4' /> Generate from AI</>}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={editorValue}
          onChange={(e) => {
            setEditorValue(e.target.value);
            onRichTextEditorChange(e, 'workSummery', index);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;