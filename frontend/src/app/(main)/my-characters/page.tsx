'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ImageIcon, Plus, Sparkles } from 'lucide-react'

import { PageHeader } from '@/components/reusable/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import { useDeleteCharacterMutation, useGetCharactersQuery } from '@/redux/api/characterApi'
import { getDownloadUrl } from '@/utils'
import { getResolvedImageUrl } from '@/utils/image'

import DeleteConfirmationModal from '@/components/reusable/DeleteConfirmationModal'
import { MediaViewModal } from '@/components/reusable/MediaViewModal'

// Split components
import { CharacterSkeleton } from '@/components/feature/characters/CharacterSkeleton'
import { CharacterSearchBar } from '@/components/feature/characters/CharacterSearchBar'
import { CharacterGridCard } from '@/components/feature/characters/CharacterGridCard'
import { CharacterListCard } from '@/components/feature/characters/CharacterListCard'

const MyCharactersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState<{ id: string; name: string } | null>(null)
  const [selectedCharacter, setSelectedCharacter] = useState<any | null>(null)
  
  const [deleteCharacter, { isLoading: isDeleting }] = useDeleteCharacterMutation()
  const { t } = useTranslation()
  const router = useRouter()

  const {
    data: charactersData,
    isLoading,
    refetch,
  } = useGetCharactersQuery({
    page: 1,
    limit: 50,
  })

  const characters = charactersData?.data?.characters || []

  const filteredCharacters = characters.filter(
    (char: any) =>
      char.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.prompt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      char.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string, name: string) => {
    setCharacterToDelete({ id, name })
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!characterToDelete) return

    try {
      await deleteCharacter(characterToDelete.id).unwrap()
      toast.success('Character deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to delete character')
    } finally {
      setDeleteModalOpen(false)
      setCharacterToDelete(null)
    }
  }

  const handleDownload = async (imageUrl: string, characterName: string) => {
    try {
      const url = getDownloadUrl(imageUrl)
      if (!url) return

      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `${characterName.replace(/\s+/g, '-').toLowerCase()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      toast.error('Failed to download image')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        icon={<ImageIcon className="w-6 h-6 text-primary animate-pulse" />}
        title={t('my_characters', { defaultValue: 'My Characters' })}
        subtitle={isLoading ? t('loading_characters', { defaultValue: 'Loading characters...' }) : `You have ${filteredCharacters.length} character${filteredCharacters.length !== 1 ? 's' : ''}`}
        showBackButton={false}
        endContent={
          <Button
            onClick={() => router.push(ROUTES.CHARACTERS)}
            className="h-10 px-5 rounded-xl text-white! font-bold gap-2 primary-btn shrink-0"
          >
            <Plus className="w-4 h-4" />
            {t('add_characters', { defaultValue: 'Add Characters' })}
          </Button>
        }
      />

      {/* Search and View Controls */}
      <CharacterSearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        placeholder={t('search_characters_placeholder', { defaultValue: 'Search characters...' })}
      />

      {/* Characters List */}
      {isLoading ? (
        <CharacterSkeleton viewMode={viewMode} />
      ) : filteredCharacters.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 rounded-full flex bg-primary/15 items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('no_characters_found', { defaultValue: 'No characters found' })}</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchTerm ? t('search_no_results', { defaultValue: 'Try adjusting your search terms' }) : t('create_first_character', { defaultValue: 'Start by generating your first AI character' })}
            </p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((char: any) => (
            <CharacterGridCard
              key={char._id || char.id}
              char={char}
              onSelect={setSelectedCharacter}
              onDownload={handleDownload}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCharacters.map((char: any) => (
            <CharacterListCard
              key={char._id || char.id}
              char={char}
              onSelect={setSelectedCharacter}
              onDownload={handleDownload}
              onDelete={handleDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setCharacterToDelete(null)
        }}
        onConfirm={handleConfirmDelete}
        title={t('delete_character', 'Delete Character')}
        description={`Are you sure you want to delete "${characterToDelete?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />

      <MediaViewModal
        isOpen={selectedCharacter !== null}
        onClose={() => setSelectedCharacter(null)}
        title={selectedCharacter?.name || ''}
        mediaUrl={selectedCharacter ? getResolvedImageUrl(selectedCharacter.image_url) : null}
        isVideo={false}
        prompt={selectedCharacter?.prompt}
        description={selectedCharacter?.description}
        createdAt={selectedCharacter?.created_at}
        creditsUsed={selectedCharacter?.credits_used}
        customBadges={
          selectedCharacter && (
            <>
              <Badge className="px-2.5 py-0.5 text-xs font-bold rounded-md border shadow-2xl bg-primary text-white!">
                {selectedCharacter.style || 'Generated'}
              </Badge>
              <span className="text-3xs sm:text-xs font-semibold text-subtitle-color dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {selectedCharacter.resolution}
              </span>
            </>
          )
        }
        onDownload={selectedCharacter ? () => handleDownload(selectedCharacter.image_url, selectedCharacter.name) : undefined}
        onDelete={selectedCharacter ? () => {
          const char = selectedCharacter
          setSelectedCharacter(null)
          handleDelete(char._id || char.id, char.name)
        } : undefined}
        isDeleting={isDeleting}
        isCharacter={true}
        characterList={filteredCharacters}
        currentCharacterIndex={filteredCharacters.findIndex((char: any) => (char._id || char.id) === (selectedCharacter?._id || selectedCharacter?.id))}
        onNavigateCharacter={(index) => setSelectedCharacter(filteredCharacters[index])}
        onUseCharacter={selectedCharacter ? () => {
          router.push(`${ROUTES.TEXT_TO_IMAGE}?character=${encodeURIComponent(selectedCharacter.name)}`)
        } : undefined}
        customResolution={selectedCharacter?.resolution}
        customStyle={selectedCharacter?.style}
        customModel={selectedCharacter?.model_used}
        customUsageCount={selectedCharacter?.usage_count}
      />
    </div>
  )
}

export default MyCharactersPage
