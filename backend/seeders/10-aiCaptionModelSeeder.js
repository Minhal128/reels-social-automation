exports.up = async ({ db }, mongoose) => {
  const { AICaptionModel } = db;
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY || 'GEMINI_API_KEY_REQUIRED';
    const openaiApiKey = process.env.OPENAI_API_KEY || 'OPENAI_API_KEY_REQUIRED';

    const models = [
      {
        name: 'Gemini 3.8 Flash',
        model_id: 'gemini-3.8-flash',
        provider: 'gemini',
        api_key: geminiApiKey,
        is_default: true,
        is_active: true,
        credit_cost: 10,
        description: 'Fast and efficient model for general caption generation',
        max_output_tokens: 500
      },
      {
        name: 'Gemini 3.6 Flash',
        model_id: 'gemini-3.6-flash',
        provider: 'gemini',
        api_key: geminiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 10,
        description: 'Balanced model for everyday caption generation',
        max_output_tokens: 500
      },
      {
        name: 'Gemini 3.5 Flash Lite',
        model_id: 'gemini-3.5-flash-lite',
        provider: 'gemini',
        api_key: geminiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 8,
        description: 'Lightweight model for cost-effective caption generation',
        max_output_tokens: 500
      },
      {
        name: 'Gemini 2.5 Pro',
        model_id: 'gemini-2.5-pro',
        provider: 'gemini',
        api_key: geminiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 15,
        description: 'Advanced model with enhanced reasoning for complex captions',
        max_output_tokens: 500
      },
      {
        name: 'Gemini 2.5 Flash',
        model_id: 'gemini-2.5-flash',
        provider: 'gemini',
        api_key: geminiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 12,
        description: 'Balanced model with improved quality and speed',
        max_output_tokens: 500
      },
      {
        name: 'Gemini 2.5 Flash Lite',
        model_id: 'gemini-2.5-flash-lite',
        provider: 'gemini',
        api_key: geminiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 10,
        description: 'Efficient model optimized for quick caption generation',
        max_output_tokens: 500
      },
      {
        name: 'GPT-4o',
        model_id: 'gpt-4o',
        provider: 'openai',
        api_key: openaiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 20,
        description: 'OpenAI\'s most advanced model for high-quality captions',
        max_output_tokens: 500
      },
      {
        name: 'GPT-4o Mini',
        model_id: 'gpt-4o-mini',
        provider: 'openai',
        api_key: openaiApiKey,
        is_default: false,
        is_active: true,
        credit_cost: 12,
        description: 'Cost-effective OpenAI model for general caption generation',
        max_output_tokens: 500
      }
    ];

    for (const model of models) {
      const existing = await AICaptionModel.findOne({ model_id: model.model_id });
      if (existing) {
        const update = { ...model };
        if (update.api_key.endsWith('_REQUIRED')) delete update.api_key; // keep a key the admin already saved
        await AICaptionModel.updateOne({ model_id: model.model_id }, { $set: update });
      } else {
        await AICaptionModel.create(model);
      }
    }

    // Shut down by the providers (see ai.google.dev/gemini-api/docs/deprecations, developers.openai.com/api/docs/deprecations).
    await AICaptionModel.updateMany(
      { model_id: { $in: ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gpt-4-turbo', 'o1-mini', 'o3-mini'] } },
      { $set: { is_active: false, is_default: false } }
    );
    console.log('✅ AI Caption Models seeded/updated successfully.');

  } catch (error) {
    console.error('Error seeding AI Caption Models:', error);
  }
};

exports.down = async ({ db }, mongoose) => {
  const { AICaptionModel } = db;
  try {
    await AICaptionModel.deleteMany({});
  } catch (error) {
    console.error('Error removing AI Caption Models:', error);
  }
};
