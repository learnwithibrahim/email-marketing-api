"use client"

import React, { useEffect, useState } from "react"

interface Props {
    value: string
    onChange: (value: string) => void
}

export default function CustomCKEditor({ value, onChange }: Props) {
    const [Editor, setEditor] = useState<any>(null)
    const [ClassicEditor, setClassicEditor] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Dynamic import inside useEffect to be absolutely sure it's client-side
        const loadEditor = async () => {
            try {
                const { CKEditor } = await import("@ckeditor/ckeditor5-react")
                const Classic = await import("@ckeditor/ckeditor5-build-classic")

                setEditor(() => CKEditor)
                setClassicEditor(() => Classic.default || Classic)
                setLoading(false)
            } catch (error) {
                console.error("CKEditor load error:", error)
                setLoading(false)
            }
        }

        loadEditor()
    }, [])

    if (loading) {
        return (
            <div className="w-full min-h-[400px] bg-slate-50 animate-pulse rounded-md border border-slate-200 flex flex-col items-center justify-center gap-2">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-slate-400 text-sm font-medium">Initializing Editor...</span>
            </div>
        )
    }

    if (!Editor || !ClassicEditor) {
        // Fallback editable area when CKEditor fails to load so users can still type
        return (
            <div className="w-full min-h-[200px] bg-white rounded-md border border-slate-200 p-2">
                <div className="text-xs text-muted-foreground mb-2">Editor not available — using plain editor</div>
                <textarea
                    className="w-full min-h-[200px] p-3 text-base outline-none"
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
                    placeholder="Start typing your professional email content..."
                    spellCheck={true}
                    tabIndex={0}
                />
            </div>
        )
    }

    return (
        <div className="ckeditor-container w-full border border-slate-300 rounded-md overflow-hidden bg-white shadow-sm transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20">
            <style>{`
        .ck-editor__editable_inline {
          min-height: 400px;
          padding: 1.5rem !important;
          font-family: inherit;
          font-size: 16px;
          line-height: 1.6;
        }
        .ck.ck-editor__main>.ck-editor__editable {
          background: #fff;
          border: none !important;
        }
        .ck.ck-toolbar {
          background: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
          border-top: none !important;
          border-left: none !important;
          border-right: none !important;
          padding: 0.5rem !important;
        }
        .ck.ck-button:hover {
          background: #f1f5f9 !important;
        }
        .ck.ck-button.ck-on {
          background: #e2e8f0 !important;
          color: #2563eb !important;
        }
      `}</style>
            <Editor
                editor={ClassicEditor}
                data={value ?? ''}
                config={{
                    licenseKey: 'GPL',
                    placeholder: 'Start typing your professional email content...',
                    toolbar: {
                        items: [
                            'heading', '|',
                            'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                            'outdent', 'indent', '|',
                            'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
                        ]
                    },
                    table: {
                        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
                    }
                }}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData()
                    onChange(data)
                }}
            />
        </div>
    )
}
