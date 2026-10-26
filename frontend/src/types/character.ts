export interface Character {
  _id: string
  id: string
  name: string
  description?: string
  prompt: string
  negative_prompt?: string
  image_url: string
  style: string
  resolution: string
  provider?: string
  model_used?: string
  credits_used?: number
  user_id?: string
  tags?: string[]
  status?: 'active' | 'inactive' | 'draft'
  usage_count?: number
  reference_image_url?: string
  created_at?: string
  updated_at?: string
}

export interface StyleOption {
  value: string
  label: string
  defaultLabel:string
}

export interface ResolutionOption {
  value: string
  label: string
  defaultLabel:string
}

export interface CharacterFormProps {
  name: string
  setName: (val: string) => void
  description: string
  setDescription: (val: string) => void
  prompt: string
  setPrompt: (val: string) => void
  negativePrompt: string
  setNegativePrompt: (val: string) => void
  style: string
  setStyle: (val: string) => void
  resolution: string
  setResolution: (val: string) => void
  tags: string
  setTags: (val: string) => void
  imagePreview: string
  setImagePreview: (val: string) => void
  setReferenceImageUrl: (val: string) => void
  isGenerating: boolean
  onGenerate: () => void
  isEditing?: boolean
}

export interface CharacterResultProps {
  isGenerating: boolean
  resultImage: string | null
  currentCharacter: Character | null
  isSaving: boolean
  onSaveToMedia: () => void
  onDownload: () => void
}

export interface GetCharactersResponse {
  success: boolean
  data: {
    characters: Character[]
    pagination: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
}

export interface CharTaskProp {
  taskId: string
  type: string
  status: string
  character: Character
  message: string
}

export interface CharacterGridCardProps {
  char: any
  onSelect: (char: any) => void
  onDownload: (imageUrl: string, characterName: string) => void
  onDelete: (id: string, name: string) => void
  isDeleting: boolean
}

export interface CharacterListCardProps {
  char: any
  onSelect: (char: any) => void
  onDownload: (imageUrl: string, characterName: string) => void
  onDelete: (id: string, name: string) => void
  isDeleting: boolean
}

export interface CharacterPickerModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (item: any) => void
}

export interface CharacterSearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  placeholder?: string
}

export interface CharacterSkeletonProps {
  viewMode: 'grid' | 'list'
}